import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../services/post.services";

export const createNewPost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user
  const data = req.body

  try {
    for (let key in data) {
      if (typeof data[key] !== 'string') {
        throw new AppError('favor verificar os valores informados, as chaves `title` e `content` aceitam apenas `string`')
      }
    }
    const newPost = await createPost(data, id)

    return res.send(newPost)
  } catch (error) {
    next(error)
  }
}

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await getAllPosts()

    return res.send(posts)
  } catch (error) {
    next(error)
  }
}

export const getPostByIdReq = async (req: Request, res: Response, next: NextFunction) => {
  const {post_id} = req.params
  try {
    const post = await getPostById(post_id)

    return res.send(post)
  } catch (error) {
    next(error)
  }
}

export const updatePostById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user
  const { post_id } = req.params
  const data = req.body
  const validKeys = ['title', 'content']

  try {
    let count = 0
    for (let key in data) {
      if (!validKeys.includes(key)) {
        count++
      }

      if (count !== 0) {
        throw new AppError(`Apenas os campos '${validKeys[0]}' e '${validKeys[1]}', podem ser atualizados`)
      }

      if (typeof data[key] !== 'string') {
        throw new AppError(`Por favor verifique o campo '${key}', ele aceita apenas 'string'`)
      }
    }



    const updatedPost = await updatePost(data, post_id, id)

    return res.status(200).send(updatedPost)

  } catch (error) {
    next(error)
  }
}

export const deletePostById = async (req: Request, res: Response, next: NextFunction) => {
  const { post_id } = req.params
  const { id } = req.user

  try {
    await deletePost(post_id, id)

    return res.status(200).send({ message: 'Post deletado com sucesso' })
  } catch (error) {
    next(error)
  }
}