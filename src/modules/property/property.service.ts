import { CreatePropertyInput, CreateImageInput } from './property.schema'
import prisma from '../../utils/prisma'
import { addImageToPropertyHandler } from './property.controller'

export async function createProperty(input: CreatePropertyInput & {user_id: string}) {

  const property = await prisma.property.create({
    data: input
  })

  return property

}


export async function getUserProperties(userId: string) {

  const properties = await prisma.property.findMany({
    select: {
      id: true,
      country: true,
      address: true,
      lat: true,
      long: true,
      price: true,
      type: true,
      beds: true,
      baths: true,
      description: true,
      images: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          name: true,
          id: true,
        }
      }
    },
    where: {
      user_id: userId
    }
  })

  return properties
}


export async function updateUserProperty(userId: string, propertyId: string, data: CreatePropertyInput) {
    const updatedProperty = await prisma.property.updateMany({
      where: {
        id: propertyId,
        user_id: userId
      },
      data: data
    })


    return updatedProperty
}


export async function deleteUserProperty(userId: string, propertyId: string) {


    const deletedCount = await prisma.property.deleteMany({
      where: {
        id: propertyId,
        user_id: userId
      },
    })

    return deletedCount
}


export async function addImageToProperty(userId: string, propertyId: string, data: CreateImageInput) {

    let imageData = {
      ...data,
      property_id: propertyId
    }

    //check if owner of property
    const property = await prisma.property.findFirst({
      where: {
        id: propertyId
      },
      select: {
        user_id: true
      }
    })

    if(property?.user_id !== userId) {
      throw "User not owner of property"
      // return
    }


    const newImage = await prisma.image.create({
      data: imageData 
    })

    return newImage
}


export async function deleteImageFromProperty(userId: string, propertyId: string, imageId: string) {

  
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId
    }
  })

  if(property?.user_id !== userId) {
    throw "User not owner of image"
  }

  await prisma.image.delete({
    where: {
      id: imageId 
    }
  })
}

//TODO: implement update of image
export async function updateImageOnProperty(userId: string, propertyId: string, imageId: string, data: CreateImageInput) {


  const property = await prisma.property.findFirst({
    where: {
      id: propertyId
    }
  })

  if(property?.user_id !== userId) {
    throw "User not owner of image"
  }

  await prisma.image.updateMany({
    where: {
      id: imageId
    },
    data: data 
  })
}