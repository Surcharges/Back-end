import express from 'express'
import { NextFunction } from 'express'
import admin from 'firebase-admin'

export const AdminAuth = async (
  request: express.Request,
  response: express.Response,
  next: NextFunction
) => {

  const authorization = request.headers.authorization

  if (!authorization) {
    response.status(401).send()
    return 
  }

  const [scheme, idToken] = authorization.split(' ')

  if (scheme !== 'Bearer') {
    response.status(401).send()
    return
  }

  try {
    await admin.auth().verifyIdToken(idToken)
    next()
  } catch {
    response.status(401).send({ message: 'Unauthorized' })
  }
}