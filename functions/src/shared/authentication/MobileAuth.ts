import express from 'express'
import { NextFunction } from 'express'

export const MobileAuth = async (
  request: express.Request,
  response: express.Response,
  next: NextFunction
) => {

  const apiKey = request.headers.authorization

  if (!apiKey) {
    response.status(401).send()
    return 
  }

  const [scheme, token] = apiKey.split(' ')

  if (scheme !== process.env.MOBILE_API_KEY_SCHEME) {
    response.status(401).send()
    return
  }

  const buffer = Buffer.from(token, 'base64')
  const decodedToken = buffer.toString('utf-8')

  if (decodedToken == process.env.MOBILE_API_KEY) {
    next()
  } else {
    response.status(403).send()
  }
}