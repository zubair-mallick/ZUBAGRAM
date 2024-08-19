import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req,res)=>{
    try{
        const {username, email, password} = req.body;
        if(!username||!email||!password)
            return res.status(401).json(
        {
            message: 'All fields are required',
            success:false,
        });
        const user = await User.findOne({email})
        if(user){
            return res.status(402).json({
                message: 'Email already exists',
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password,5)

        await User.create({
            username,
            email,
            password:hashedPassword,
        });
        return res.status(201).json({
            message: 'account created succesfully',
            success: true,
        });
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

export const login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email||!password)
            return res.status(401).json(
        {
            message: 'All fields are required',
            success:false,
        });
        let user = await User.findOne({email})
        if(!user)
            return res.status(402).json({
                message: 'Invalid email or password',
                success: false,
            });
        const match = await bcrypt.compare(password, user.password)
        if(!match)
            return res.status(402).json({
                message: 'Invalid email or password',
                success: false,
            });

        
        user ={
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: user.posts,
        }    
    
        const token = jwt.sign({userid: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        return res.cookie('token', token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*1000}).json({
            message: `Logged in successfully of user ${user.username}`,
            success: true,
            user
        })
    }
    catch(error){
        console.error('\x1b[31m%s\x1b[0m', error);
    }
}

export const logout = async (req,res)=>{
    try{
        return res.cookie("token","",{maxAge:0}).json(
            {
                message: "Logged out successfully",
                success: true,
            }
        )
    }
    catch(error){ console.error('\x1b[31m%s\x1b[0m', error);}
}

export const getProfile = async (req,res)=>{
    try{

        const userId = req.params.user.id;
        let user = await User.findById(userId);
        return res.status(200).json({
            user,
            success: true,
        })
    }
    catch(error){ console.error('\x1b[31m%s\x1b[0m', error);}
}

export const editProfile = async (req,res)=>{
    try{
        const userid = rq.id;
        const {bio,gender} = req.body;
        const profilePicture = req.file;

        let cloudResponse;
        if(profilePicture){
            const fileUri = getDataUri(profilePicture);
            await cloudinary.uploader.upload(fileUri)
        }
        const user = await User.findById(userid);
        if(!user){ 
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
        if(bio) user.bio = bio;
        if(gender) user.gender = gender;
        if(profilePicture){
            user.profilePicture = cloudResponse.secure_url;
        }

        await user.save();
        return res.status(200).json({
            message:"profile updated",
            success: true,
            user
        })
    }
    catch(error){ console.error('\x1b[31m%s\x1b[0m', error);}
}

export const getSuggestedUser = async(req, res) => {
    try{
        const suggestedUsers = await User.find({_id:{$ne:req.id}}).select("-password");
        if(!suggestedUsers){
            return res.status(404).json({
                message: "No suggested users found",
            });
        }
        res.status(200).json({
            users:suggestedUsers,
            success: true,
        })
    }
    catch(error){ console.error('\x1b[31m%s\x1b[0m', error);} 

};

export const followOrUnfollow = async (req, res) => {
    try{
         const followingFrom = req.id;
         const followingTo = req.params.user.id;
         if(followingFrom === followingTo){
             return res.status(400).json({
               success:false,
                message: "You can't follow/unfollow yourself",
             });
         }

         const user = await User.findById(followingFrom)
         const targetUser = await User.findById(followingTo)
         if(!user || !targetUser){
            return res.status(404).json({
                message: "User not found",
                success: false,
            })
        }

        //check follow or unfollow
        const isFollowing = user.following.includes(followingTo);
        if(isFollowing){
            //unfollow

            await Promise.all([
                User.updateOne({_id:followingFrom},{$pull:{following:followingTo}}),
                User.updateOne({_id:followingTo},{$pull:{followers:followingFrom}})

            ])
            return res.status(200).json({
                success: true,
                message: "User unfollowed",
            })
        }
        else
        { //follow
            await Promise.all([
                User.updateOne({_id:followingFrom},{$push:{following:followingTo}}),
                User.updateOne({_id:followingTo},{$push:{followers:followingFrom}})

            ])
            return res.status(200).json({
                success: true,
                message: "User followed",
            })
           
        }

     }
    catch(error){ console.error('\x1b[31m%s\x1b[0m', error);}
}