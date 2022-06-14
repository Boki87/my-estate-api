import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'


const propertyCore = {
  country: z.string(),
  address: z.string(),
  lat: z.number(),
  long: z.number(),
  price: z.number(),
  type: z.string(),
  beds: z.number(),
  baths: z.number(),
  description: z.string(),
}

const propertyGenerated = {
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
}

const createPropertySchema = z.object({
  ...propertyCore
})

const propertyResponseSchema = z.object({
  ...propertyCore,
  ...propertyGenerated
})

const createImageSchema = z.object({
  url: z.string(),
  type: z.string(),
  order_id: z.number()
})

const imageResponseSchema = z.object({
  id: z.string(),
  url: z.string(),
  type: z.string(),
  order_id: z.number()
})


export type CreatePropertyInput = z.infer<typeof createPropertySchema>
export type CreateImageInput = z.infer<typeof createImageSchema>

export const { schemas: propertySchema, $ref } = buildJsonSchemas({
  createPropertySchema,
  propertyResponseSchema,
  createImageSchema,
  imageResponseSchema
})
