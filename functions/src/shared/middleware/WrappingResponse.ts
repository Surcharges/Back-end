import express from 'express'
import { NextFunction } from 'express'

export const WrappingResponse = async (
  request: express.Request,
  response: express.Response,
  next: NextFunction
) => {

  const originalJson = response.json.bind(response)

  response.json = (body) => {
    const wrappedBody = { data: body }
    return originalJson(wrappedBody)
  }

  next()

}