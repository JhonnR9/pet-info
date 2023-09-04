import { NextFunction, Request, Response } from "express";
import { authService } from "../services/session.services";

export const login = async (req:Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body

  try {
    const authUser = await authService(email, password)

    return res.send(authUser)
  } catch(err) {
    next(err)
  }
}