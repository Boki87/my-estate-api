import { FastifyRequest, FastifyReply } from 'fastify'
import { CreatePropertyInput, CreateImageInput } from './property.schema'
import { createProperty, getUserProperties,updateUserProperty, deleteUserProperty, addImageToProperty, deleteImageFromProperty, updateImageOnProperty } from './property.service'


export async function createPropertyHandler(request: FastifyRequest<{ Body: CreatePropertyInput }>, reply: FastifyReply) {


  const body = request.body

  try {
    const property = await createProperty({...body, user_id: request.user.id})
    return reply.code(201).send(property)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }

}

export async function getUserPropertiesHandler(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.id  

  try {
    const properties = await getUserProperties(userId)
     return reply.code(200).send(properties)
  } catch(e) {
    return reply.code(500).send(e)
  }
}


export async function updateUserPropertyHandler(request: FastifyRequest<{Body: CreatePropertyInput, Params: {id: string}}>, reply: FastifyReply) {

  const userId = request.user.id
  const propertyId = request.params.id
  const data = request.body
  
  try {
    await updateUserProperty(userId, propertyId, data)
    return reply.code(200).send({
      message: "Successfully updated the property"
    })
  } catch(e) {
    return reply.code(500).send(e)
  }
}


export async function deleteUserPropertyHandler(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
  const userId = request.user.id
  const propertyId = request.params.id

  try {
    await deleteUserProperty(userId, propertyId)
    return reply.code(200).send({
      message: "Successfully deleted the property"
    })
  } catch(e) {
    return reply.code(500).send(e)
  }
}

export async function addImageToPropertyHandler(request: FastifyRequest<{Body: CreateImageInput, Params: {id: string}}>, reply: FastifyReply) {

  const userId = request.user.id
  const propertyId = request.params.id
  const data = request.body
  try {
    const newImage = await addImageToProperty(userId, propertyId, data)
    return reply.code(201).send(newImage)
  }catch(e) {
    console.log(e)
    return reply.code(500).send({
      message: e
    })
  }
}


export async function deleteImageFromPropertyHandler(request: FastifyRequest<{Params: {id: string, imageId: string}}>, reply: FastifyReply) {

  const userId = request.user.id
  const propertyId = request.params.id
  const imageId = request.params.imageId


  try {
    await deleteImageFromProperty(userId, propertyId, imageId)
    return reply.code(201).send({
      message: "Successfully deleted image"
    })
  }catch(e) {
    return reply.code(500).send(e)
  }

}
export async function updateImageOnPropertyHandler(request: FastifyRequest<{Body: CreateImageInput, Params: {id: string, imageId: string}}>, reply: FastifyReply) {

  const userId = request.user.id
  const propertyId = request.params.id
  const imageId = request.params.imageId
  const data = request.body

  try {
    await updateImageOnProperty(userId, propertyId, imageId, data)
    return reply.code(201).send({
      message: "Successfully updated image"
    })
  }catch(e) {
    return reply.code(500).send(e)
  }

}