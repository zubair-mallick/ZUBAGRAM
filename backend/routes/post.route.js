import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import upload from '../middlewares/multer.js'
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPosts, getCommentFromPost, getUserPosts, likePost } from '../controllers/post.controller.js'

const router = express.Router()

router.route('/addpost').post(isAuthenticated,upload.single('image'),addNewPost)
router.route('/all').get(isAuthenticated,getAllPosts)
router.route('/userpost/all').get(isAuthenticated,getUserPosts)
router.route('/:id/dislike').get(isAuthenticated,dislikePost)
router.route('/:id/comment').post(isAuthenticated,addComment)
router.route('/:id/comment/all').post(isAuthenticated,getCommentFromPost)
router.route('/delete/:id').post(isAuthenticated,deletePost)
router.route('/:id/bookmarks').post(isAuthenticated,bookmarkPost)

export default router

