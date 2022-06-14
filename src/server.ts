import Fastify, { FastifyRequest, FastifyReply } from 'fastify'
import fjwt, { JWT } from '@fastify/jwt'
import { userSchemas } from './modules/user/user.schema'
import {propertySchema} from './modules/property/property.schema'
import userRoutes from './modules/user/user.route'
import propertyRoutes from './modules/property/property.route'

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT
  }

  export interface FastifyInstance {
    auth: any
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: string
      email: string
      name: string
    }
  }
}





function buildServer() {


  const server = Fastify({logger: true})
  


  server.register(fjwt, {
    secret: "aqwoasflkj14124kl"
  })


  server.decorate("auth",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify()
      } catch (e) {
        return reply.send(e)
      }
    }
  )

  server.get("/healthcheck", () => {
    return { status: "ok" }
  })


  for (const schema of [...userSchemas, ...propertySchema]) {
    server.addSchema(schema)
  }



  server.register(userRoutes, { prefix: "api/users" })
  server.register(propertyRoutes, { prefix: "api/properties" })
  return server

}

export default buildServer
