import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'


const userCore = {
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  }).email(),
  name: z.string()
}


const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
  }),
})


const createUserResponseSchema = z.object({
  id: z.string(),
  ...userCore
})


export type CreateUserInput = z.infer<typeof createUserSchema>


const loginUserSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  }),
  password: z.string(),
})


const loginResponseSchema = z.object({
  accessToken: z.string()
})

export type LoginInput = z.infer<typeof loginUserSchema>


export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginUserSchema,
  loginResponseSchema
})
