import { Router } from "express";
import { createNewPost, deletePostById, getPostByIdReq, getPosts, updatePostById } from "../controllers/post.controllers";
import { ensureAuth } from "../middlewares/ensureAuth";

export const postRouter = Router()

postRouter.use(ensureAuth)
postRouter.post('/create', createNewPost)
postRouter.get('/', getPosts)
postRouter.get('/:post_id', getPostByIdReq)
postRouter.patch('/:post_id', updatePostById)
postRouter.delete('/:post_id', deletePostById)