import express from "express"
import { getPlace } from "@domain/place"

interface Response extends express.Response {

}

export const place = async (request: express.Request, response: Response) => {

  const placeId = request.query.id as string || undefined
  
  if (!placeId) {
    response.status(400).send({message: "placeId is required"})
    return
  }

  const place = await getPlace({ id: placeId })
  
  response.status(200).send(place)
}