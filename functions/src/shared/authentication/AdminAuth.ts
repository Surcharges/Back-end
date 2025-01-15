import express from 'express'
import { NextFunction } from 'express'
import admin from 'firebase-admin'

export const AdminAuth = async (
  request: express.Request,
  response: express.Response,
  next: NextFunction
) => {

  const idToken = request.headers.authorization

  if (!idToken) {
    response.status(400).send({ message: 'Bad request' })
    return 
  }

  try {
    await admin.auth().verifyIdToken(idToken)
    next()
  } catch {
    response.status(401).send({ message: 'Unauthorized' })
  }
}