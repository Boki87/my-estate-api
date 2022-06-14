import { FastifyRequest, FastifyReply } from 'fastify'
import { createUser, findUserByEmail } from './user.service'
import { CreateUserInput, LoginInput } from './user.schema'
import { verifyPassword } from '../../utils/hash'
import { server } from '../../app'

export async function registerUserHandler(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {

  const body = request.body

  try {
    const user = await createUser(body)
    return reply.code(201).send(user)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}


export async function loginUserHandler(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {


  const body = request.body

  //find user by email
  const user = await findUserByEmail(body.email)

  if (!user) {
    return reply.code(401).send({
      message: "Invalid email or passwore"
    })
  }

  //if user exists verify password
  const isCorrectPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password
  })


  //if password correct, desctucture out password and salt from user object and create a access token with rest of properites
  if (isCorrectPassword) {

    const { password, salt, ...rest } = user

    //generate access token
    const token = server.jwt.sign(rest)
    return { accessToken: token }
  }

  //if password is wrong, send error message
  return reply.code(401).send({
    message: "Invalid email or password"
  })

}
