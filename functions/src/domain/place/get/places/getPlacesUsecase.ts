import { GetSurchargesRepository, SurchargeStatus } from "@data/surcharge"
import { GetPlacesUsecaseRequest } from "./entity/GetPlacesUsecaseRequest"
import { GetPlacesUsecaseResponse } from "./entity/GetPlacesUsecaseResponse"
import { GetPlacesRepository } from "@data/place"
import { locationRestrictionOfNZ } from "@shared/constants"

export function GetPlacesUsecase(request: GetPlacesUsecaseRequest): Promise<GetPlacesUsecaseResponse>
export function GetPlacesUsecase(placeIds: string[]): Promise<GetPlacesUsecaseResponse>

export async function GetPlacesUsecase(param: GetPlacesUsecaseRequest | string[]): Promise<GetPlacesUsecaseResponse> {

  if (Array.isArray(param)) {
    return await _GetPlacesByPlaceId(param)
  } else {
    return await _GetPlacesByRequest(param)
  }

}

async function _GetPlacesByPlaceId(placeId: string[]): Promise<GetPlacesUsecaseResponse> {

  /*
    I think you can start here, and of course you need a repository for getting places by placeId
    I made a snippet for you, and it can be found in GetPlacesRepository.ts
    Return nextPageToken as undefined.
  */

  return {
    places: [],
    nextPageToken: undefined,
  }
}

async function _GetPlacesByRequest(request: GetPlacesUsecaseRequest): Promise<GetPlacesUsecaseResponse> {
  if (request.userLocation) {
    if (!isPointInRectangle(request.userLocation, locationRestrictionOfNZ)) {
      throw new Error("User location is out of New Zealand")
    }
  }

  const resultPlaces = await GetPlacesRepository(
    {
      searchText: request.searchText,
      nextPageToken: request.nextPageToken,
      userLocation: request.userLocation,
    }
  )

  const resultPlaceIds = resultPlaces.places.map((place) => {
    return place.id
  })

  try {

    const resultSurcharges = await GetSurchargesRepository(resultPlaceIds)

    const placesWithSurcharges = resultPlaces.places.map((place) => {
      return {
        id: place.id,
        displayName: {
          text: place.displayName.text,
          languageCode: place.displayName.languageCode,
        },
        addressComponents: place.addressComponents.map((component) => ({
          longText: component.longText,
          shortText: component.shortText,
          types: component.types,
          languageCode: component.languageCode,
        })),
        location: place.location
          ? {
            latitude: place.location.latitude,
            longitude: place.location.longitude,
          }
          : undefined,
        rate: resultSurcharges.find((surcharge) => surcharge.id === place.id)?.rate,
        surchargeStatus: resultSurcharges.find((surcharge) => surcharge.id === place.id)?.surchargeStatus as SurchargeStatus,
      }
    })

    return {
      places: placesWithSurcharges,
      nextPageToken: resultPlaces.nextPageToken,
    }

  } catch (error) {
    throw error
  }
}

function isPointInRectangle(
  userLocation: { latitude: number, longitude: number },
  locationRestrictionOfNZ: { rectangle: { low: { latitude: number, longitude: number }, high: { latitude: number, longitude: number } } }
): boolean {

  const { latitude, longitude } = userLocation

  const {
    low: { latitude: latLow, longitude: lonLow },
    high: { latitude: latHigh, longitude: lonHigh },
  } = locationRestrictionOfNZ.rectangle

  return (
    latitude >= latLow &&
    latitude <= latHigh &&
    longitude >= lonLow &&
    longitude <= lonHigh
  )
}