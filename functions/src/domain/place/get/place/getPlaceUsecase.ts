import { GetPlaceRepository } from "@data/place"
import { GetPlaceUsecaseRequest } from "./entity/GetPlaceUsecaseRequest"
import { GetPlaceUsecaseResponse } from "./entity/GetPlaceUsecaseResponse"

export const getPlaceUsecase = async (request: GetPlaceUsecaseRequest): Promise<GetPlaceUsecaseResponse> => {

  const result = await GetPlaceRepository(request.id)
  
  return {
    id: result.place.id,
    displayName: {
      text: result.place.displayName.text,
      languageCode: result.place.displayName.languageCode
    },
    addressComponents: result.place.addressComponents.map((component) => {
      return {
        longText: component.longText,
        shortText: component.shortText,
        types: component.types,
        languageCode: component.languageCode
      }
    }),
    location: result.place.location ? {
      latitude: result.place.location.latitude,
      longitude: result.place.location.longitude
    } : undefined
  }
}