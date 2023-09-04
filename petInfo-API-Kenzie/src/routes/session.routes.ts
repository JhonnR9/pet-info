import { Router } from "express";
import { login } from "../controllers/session.controllers";

export const sessionRouter = Router()

sessionRouter.post('/', login)