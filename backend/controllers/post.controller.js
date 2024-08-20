import sharp from 'sharp'
import cloudinary from '../utils/cloudinary.js'
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js'
import { Comment } from '../models/comment.model.js';

export const addNewPost = async (req, res) =>{
    try{
        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;
        if(!image)
            return res.status(400).json({
                message: 'Please upload an image',
                success: false,
            });
    
        const optimizedImageBuffer = await sharp(image.buffer).resize({width:800,height:800,fit:inside}).toFormat('jpeg',{quality:80}).toBuffer()


        const fileUri =`data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`
        const cloudResponse = await cloudinary.uploader.upload(fileUri)
        const post = await Post.create({caption,image:cloudResponse.secure_url,author:authorId})

        const user = await User.findById(authorId);
        if(user){
            user.posts.push(post._id);
            await user.save();
        }

         await post.populate({path:'author',select:'-password'})

         return res.status(201).json({
            message: 'Post created successfully',
            success: true,
            post,
         })   

        }
     catch (error) {
        console.error('\x1b[31m%s\x1b[0m', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1})
        .populate({path:'author',select:'username,profilePicture'})
        .populate({path:'comments',sort:{createdAt:-1}, populate:{
            path:'author',
            select:'username,profilePicture'
        }})

        return res.status(200).json({
            message: 'Posts fetched successfully',
            success: true,
            posts,
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error);
    }
}


export const getUserPosts = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 })
        .populate({ path: 'author', select: 'username,profilePicture' })
        .populate({path:'comments',sort:{createdAt:-1}, populate:{
            path:'author',
            select:'username,profilePicture'
        }})
        return res.status(200).json({
            message: 'Authors Posts fetched successfully',
            success: true,
            posts,
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error);
    }
}

export const likePost = async (req, res) => {
    try {
        const liker  = rq.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({
            message: 'Post not found',
            success: false,
        })

        await post.updateOne({$addToSet:{likes:liker}})
        await post.save()
 
    
        return res.status(200).json({
            message: 'Post liked successfully',
            success: true,
            post,
        })

    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error);
    }
}



export const dislikePost = async (req, res) => {
    try {
        const liker  = rq.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({
            message: 'Post not found',
            success: false,
        })

        await post.updateOne({$pull:{likes:liker}})
        await post.save()
 
    
        return res.status(200).json({
            message: 'Post disliked successfully',
            success: true,
            post,
        })

    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error);
    }
}
export const addComment = async (req, res) => {
    try{

        const postId = req.params.id;
        const commenter = req.id;

        const {text} = req.body;
        const post = await Post.findById(postId);
        if(!text) return res.status

        
        if(!post) return res.status(404).json({
            message: 'Post not found',
            success: false,
        })

        const comment = await Comment.create({text,author:commenter, post:postId})
        .populate({path:'author',select:'username,profilePicture'})
        post.comments.push(comment._id)
        await post.save()
        return res.status(200).json({
            message: 'Comment added successfully',
            success: true,
            comment,
        })
    }
    catch(error){
        console.log('\x1b[31m%s\x1b[0m', error);
    }
}

export const getCommentFromPost = async(req,res)=>{
try {
    const postId = req.params.id;
    const comments = await Comment.find({ post:postId}).populate('author','username','profilePicture')
    if(!comments ) return res.status(404).json({
        message: 'No comments found',
        success: false,
    })
    return res.status(200).json({
        message: 'Comments fetched successfully',
        success: true,
        comments,
    })

} catch (error) {
    console.log('\x1b[31m%s\x1b[0m', error);
}

}


export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);

        if(!post) return res.status(404).json({
            message: 'Post not found',
            success: false,
        })

        if(authorId !== post.author.toString()) return res.status(403).json({
            message: 'You are not authorized to delete this comment',
            success: false,
        })
        
        await Post.findByIdAndDelete(postId)

        let user = await User.findById(authorId)
        user.posts = user.posts.filter(id => id.toString()!== postId)
        await user.save();

        await Comment.deleteMany({post:postId})

        return res.status(200).json({
            message: 'Post deleted successfully',
            success: true,
        })
        
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error);
    }
}

export const bookmarkPost = async (req,res)=>{
    try{
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({
            message: 'Post not found',
            success: false,
        })

        const user = await User.findById(authorId)
        if(user.bookmarks.includes(post._id)){
            await user.updateOne({$pull:{bookmarks:post._id}})
            await user.save()
            return res.status(200).json({
                type:"unbookmarked",
                message: 'Post removed from bookmarks',
                success: true,
            })
        }
        else{
            await user.updateOne({$addToSet:{bookmarks:post._id}})
            await user.save()
            return res.status(200).json({
                type:"bookmarked",
                message: 'Post added to bookmarks',
                success: true,
            })
        }
    }
    catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error);
    }
}