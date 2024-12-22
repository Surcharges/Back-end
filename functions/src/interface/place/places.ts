import express from "express"
import { getPlaces } from "@domain/place"

interface Response extends express.Response {

}

export const places = async (request: express.Request, response: Response) => {

  const searchText = request.query.searchText as string || undefined
  const nextPageToken = request.query.nextPageToken as string || undefined

  if (!searchText) {
    response.status(400).send({message: "searchText is required"})
    return
  }

  const places = await getPlaces({ searchText, nextPageToken })
  
  response.status(200).send(places)
}