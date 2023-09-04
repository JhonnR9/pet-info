import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";
import { createUser, deleteUser, getProfile, updateUser } from "../services/user.services";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body

  try {
    for (let key in data) {
      if (typeof data[key] !== 'string') {
        throw new AppError('Por favor verifique os campos informados, todos eles aceitam apenas dados do tipo string')
      }
    }
    const newUser = await createUser(data)

    return res.send(newUser)
  } catch (err) {
    next(err)
  }
}

export const readProfile = async (req: Request, res: Response, next: NextFunction) => {
 const {id} = req.user

 try {
  const user = await getProfile(id)

  return res.send(user)
 } catch (error) {
  next(error)
 }
}

export const updateProfile = async (req:Request, res: Response, next: NextFunction) => {
  const {id} = req.user
  const data = req.body
  const validKeys = ['username', 'email', 'avatar']

  try {
    let count = 0

    for(let key in data) {
      if(!validKeys.includes(key)) {
        count++
      }
      if(typeof data[key] !== 'string') {
        throw new AppError(`Por favor insira uma 'string' no campo '${key}'`)
      }
    }

    if(count !== 0) {
      throw new AppError(`Apenas as chaves '${validKeys[0]}', '${validKeys[1]}', '${validKeys[2]}', podem ser atualizadas, favor verificar os dados informados'`)
    }

    const updatedUser = await updateUser(data, id)

    return res.send(updatedUser)
    
  } catch (error) {
    next(error)
  }
}

export const deleteProfile = async (req:Request, res: Response, next: NextFunction) => {
  const {id} = req.user

  try {
    await deleteUser(id)

    return res.send({message: 'Usuário deletado com sucesso'})
  } catch (error) {
    next(error)
  }
}