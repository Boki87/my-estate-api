import { CreateUserInput } from './user.schema'
import prisma from '../../utils/prisma'
import { hashPassword } from '../../utils/hash'



export async function createUser(input: CreateUserInput) {


  const { password, ...rest } = input

  const { hash, salt } = hashPassword(password)

  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash }
  })

  return user

}


export async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  return user
}
