import { Router } from "express";
import { deleteProfile, readProfile, signup, updateProfile } from "../controllers/user.controllers";
import { ensureAuth } from "../middlewares/ensureAuth";

export const userRouter = Router()

userRouter.post('/create', signup)
userRouter.use(ensureAuth)
userRouter.get('/profile', readProfile)
userRouter.patch('/profile', updateProfile)
userRouter.delete('/profile', deleteProfile)