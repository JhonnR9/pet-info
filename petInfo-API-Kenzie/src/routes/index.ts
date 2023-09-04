import { Router } from "express";
import { postRouter } from "./post.routes";
import { sessionRouter } from "./session.routes";
import { userRouter } from "./user.routes";

export const routes = Router()

routes.use('/login', sessionRouter)
routes.use('/users', userRouter)
routes.use('/posts', postRouter)