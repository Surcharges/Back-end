import express from "express"
import { GetPlacesUsecase } from "@domain/place"
import { Response } from "./model/GetPlacesInterfaceResponse"

export const getPlacesWithSurchargesInterface = async (request: express.Request, response: Response) => {

  try {
    const places = await GetPlacesUsecase([])

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
          image: place.image,
          surchargeStatus: place.surchargeStatus,
          totalAmount: place.totalAmount,
          surchargeAmount: place.surchargeAmount,
          reportedDate: place.reportedDate,
          rate: place.rate
        }
      }),
      nextPageToken: places.nextPageToken
    })

  } catch (error: unknown) {
    response.status(500).send({ message: error })
  }
}