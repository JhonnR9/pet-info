import { compare, hash } from "bcryptjs";
import { prisma } from "..";
import AppError from "../errors/appError";
import { ICreateUser, IResponseUser, IUpdateUser } from "../interfaces";

export const createUser = async (data: ICreateUser): Promise<IResponseUser> => {
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  })

  if (checkEmail) {
    throw new AppError('Email já cadastrado, favor informar um email que não pertença a um usuário já cadastrado')
  }

  const checkUsername = await prisma.user.findUnique({
    where: {
      username: data.username
    }
  })

  if (checkUsername) {
    throw new AppError('Username já cadastrado, favor informar um username que não pertença a um usuário já cadastrado')
  }

  const hashedPass = await hash(data.password, 8)

  const newUser = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPass,
      avatar: data.avatar
    }
  })

  const { password: userPass, ...rest } = newUser

  return rest
}

export const getProfile = async (id: string): Promise<IResponseUser> => {
  const checkUser = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!checkUser) {
    throw new AppError('Usuário não encontrado, por favor, faça login e tente novamente', 401)
  }

  const { password, ...rest } = checkUser

  return rest
}

export const updateUser = async (data: IUpdateUser, id: string): Promise<IResponseUser> => {
  const checkUser = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!checkUser) {
    throw new AppError('Usuário não encontrado, por favor faça login e tente novamente', 404)
  }

  if (data.email) {
    const checkEmail = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (checkEmail) {
      throw new AppError('Email já cadastrado, favor informar um email que não pertença a um usuário já cadastrado')
    }
  }

  if (data.username) {
    const checkUsername = await prisma.user.findUnique({
      where: {
        username: data.username
      }
    })

    if (checkUsername) {
      throw new AppError('Username já cadastrado, favor informar um username que não pertença a um usuário já cadastrado')
    }
  }

  const updatedUser = await prisma.user.update({
    where: {
      id
    },
    data: {
      username: data.username,
      email: data.email,
      avatar: data.avatar
    }
  })

  const {password, ...rest} = updatedUser

  return rest
}

export const deleteUser =async (id:string): Promise<IResponseUser> => {
  const checkUser = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if(!checkUser) {
    throw new AppError('Usuário não encontrado, faça login e tente novamente', 404)
  }

  return await prisma.user.delete({
    where: {
      id
    }
  })
}