import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts } from '@/redux/postSlice';

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector(store => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(`https://zubagram.onrender.com/api/v1/post/${selectedPost?._id}/comment`, { text }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map(p =>
          p?._id === selectedPost?._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    
    <div>
      
      <Dialog open={open}>
  
 
 
 
       <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-5xl p-0 flex flex-col bg-gray-800 text-white rounded-lg">
 
       
 
         <div className=' z-10  flex flex-1 min-h-[60vh] max-h-[90vh]'>
           <div className='w-1/2 hidden md:flex '>
             <img
               src={selectedPost?.image}
               alt="post_img"
               className='w-full h-full object-cover rounded-l-lg'
             />
           </div>
           <div className='w-full p-2 md:w-1/2 flex flex-col justify-between'>
             <div className='flex items-center justify-between p-4'>
               <div className='flex gap-3 items-center'>
                 <Link>
                   <Avatar>
                     <AvatarImage src={selectedPost?.author?.profilePicture} />
                     <AvatarFallback>CN</AvatarFallback>
                   </Avatar>
                 </Link>
                 <div>
                   <Link className='font-semibold text-xs text-white'>{selectedPost?.author?.username}</Link>
                 </div>
               </div>
 
               <Dialog>
                 <DialogTrigger asChild>
                   <MoreHorizontal className='cursor-pointer text-white' />
                 </DialogTrigger>
                 <DialogContent className="flex flex-col items-center text-sm text-center bg-gray-900 text-white rounded-lg">
                   <div className='cursor-pointer w-full text-red-500 font-bold'>
                     Unfollow
                   </div>
                   <div className='cursor-pointer w-full'>
                     Add to favorites
                   </div>
                 </DialogContent>
               </Dialog>
             </div>
             <hr className='border-gray-700' />
             <div className='flex-1 overflow-y-auto max-h-96 p-4'>
               {
                 comment.map((comment) => <Comment key={comment?._id} comment={comment} />)
               }
             </div>
             <div className='p-4 bg-gray-900 rounded-b-lg'>
               <div className='flex items-center gap-2'>
                 <input
                   type="text"
                   value={text}
                   onChange={changeEventHandler}
                   placeholder='Add a comment...'
                   className='w-full outline-none border text-sm border-gray-600 bg-gray-800 text-white p-2 rounded'
                 />
                 <Button disabled={!text.trim()} onClick={sendMessageHandler} variant="outline" className='text-zinc-900 border-gray-600'>Send</Button>
               </div>
             </div>
           </div>
         </div>
       </DialogContent>
     </Dialog>
    </div>
   )
}

export default CommentDialog;
