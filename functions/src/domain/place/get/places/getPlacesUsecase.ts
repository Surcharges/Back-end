import { GetPlacesUsecaseRequest } from "./entity/GetPlacesUsecaseRequest"
import { GetPlacesUsecaseResponse } from "./entity/GetPlacesUsecaseResponse"
import { GetPlacesRepository } from "@data/place"

export const getPlacesUsecase = async (request: GetPlacesUsecaseRequest): Promise<GetPlacesUsecaseResponse> => {

  const result = await GetPlacesRepository(request.searchText, request.nextPageToken)
  
  return {
    places: result.places.map((place) => {
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
    nextPageToken: result.nextPageToken
  }
}