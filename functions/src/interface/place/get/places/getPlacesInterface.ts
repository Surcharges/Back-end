import express from "express"
import { getPlacesUsecase } from "@domain/place"
import { Response } from "./model/GetPlacesInterfaceResponse"

export const getPlacesInterface = async (request: express.Request, response: Response) => {

  const searchText = request.query.searchText as string || undefined
  const nextPageToken = request.query.nextPageToken as string || undefined

  if (!searchText) {
    response.status(400).send({message: "searchText is required"})
    return
  }

  const places = await getPlacesUsecase({ searchText, nextPageToken })
  
  response.status(200).send({
    places: places.places.map((place) => {
      return {
        id: place.id,
        displayName: {
          text: place.displayName.text,
          languageCode: place.displayName.languageCode
        },
        addressComponents: place.addressComponents.map((component) => {
          return {
            longText: component.longText,
            shortText: component.shortText,
            types: component.types,
            languageCode: component.languageCode
          }
        }),
        location: place.location ? {
          latitude: place.location.latitude,
          longitude: place.location.longitude
        } : undefined
      }
    }),
    nextPageToken: places.nextPageToken
  })
}