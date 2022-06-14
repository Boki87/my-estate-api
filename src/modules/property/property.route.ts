import { FastifyInstance } from 'fastify'
import { createPropertyHandler, getUserPropertiesHandler, updateUserPropertyHandler, deleteUserPropertyHandler, addImageToPropertyHandler, deleteImageFromPropertyHandler,updateImageOnPropertyHandler } from './property.controller'
import { $ref } from './property.schema'


async function propertyRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
        preHandler: [server.auth],
        schema: {
          body: $ref('createPropertySchema'),
          response: {
            201: $ref('propertyResponseSchema')
          }
        }
    },
    createPropertyHandler
  )

  server.get(
    '/',
  {
    preHandler: [server.auth]
  },
  getUserPropertiesHandler
  )

  server.put(
    '/:id', 
  {
    preHandler: [server.auth]
  } ,
  updateUserPropertyHandler
  )

  server.delete(
    '/:id',
    {
      preHandler: [server.auth],
    },
    deleteUserPropertyHandler
    )



    //image endpoints
    //add image to property
    server.post(
      '/:id/image',
      {
        preHandler: [server.auth],
      },
      addImageToPropertyHandler
      )

      //delete image from property
      server.delete(
        '/:id/image/:imageId',
        {
          preHandler: [server.auth]
        },
        deleteImageFromPropertyHandler
      )


      //update image from property
      server.put(
        '/:id/image/:imageId',
        {
          preHandler: [server.auth]
        },
        updateImageOnPropertyHandler
      )
}

export default propertyRoutes
