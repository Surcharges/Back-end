import express from 'express'
import { NextFunction } from 'express'

export const MobileAuth = async (
  request: express.Request,
  response: express.Response,
  next: NextFunction
) => {

  const apiKey = request.headers.authorization

  if (!apiKey) {
    response.status(400).send({ message: 'Bad request' })
    return 
  }

  if (apiKey == process.env.MOBILE_API_KEY) {
    next()
  } else {
    response.status(401).send({ message: 'Unauthorized' })
  }
}