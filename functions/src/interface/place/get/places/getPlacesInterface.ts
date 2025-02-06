import express from "express"
import { GetPlacesUsecase } from "@domain/place"
import { Response } from "./model/GetPlacesInterfaceResponse"

export const getPlacesInterface = async (request: express.Request, response: Response) => {

  const searchText = request.query.searchText as string || undefined
  const nextPageToken = request.query.nextPageToken as string || undefined
  const latitude = request.query.latitude as string || undefined
  const longitude = request.query.longitude as string || undefined

  if (!searchText) {
    response.status(400).send({ message: "searchText is required" })
    return
  }

  const userLocation = () => {
    if (latitude && longitude) {
      return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
    }
    return undefined
  }

  try {
    const places = await GetPlacesUsecase({ searchText, nextPageToken, userLocation: userLocation() })

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
          } : undefined,
          surchargeStatus: place.surchargeStatus,
          surchargeRate: place.rate
        }
      }),
      nextPageToken: places.nextPageToken
    })

  } catch (error: unknown) {
    
    if (error instanceof Error) {
      if (error.message === "User location is out of New Zealand") {
        response.status(403).send({ message: error.message })
        return
      }
    }
    
    response.status(404).send()

  }
}