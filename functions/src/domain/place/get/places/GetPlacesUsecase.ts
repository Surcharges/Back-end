import { GetSurchargesRepository, SurchargeStatus } from "@data/surcharge"
import { GetPlacesUsecaseRequest } from "./entity/GetPlacesUsecaseRequest"
import { GetPlacesUsecaseResponse } from "./entity/GetPlacesUsecaseResponse"
import { GetPlacesRepository } from "@data/place"
import { locationRestrictionOfNZ } from "@shared/constants"

export async function GetPlacesUsecase(request: GetPlacesUsecaseRequest | string[]): Promise<GetPlacesUsecaseResponse> {
  let resultPlaces;

  if (Array.isArray(request)) {

    try {
      const allSurcharges = await GetSurchargesRepository({})
      const allSurchargesIds = allSurcharges.map((surcharge) => {
        return surcharge.id
      })
      resultPlaces = await GetPlacesRepository(allSurchargesIds)

      // const resultSurcharges = await GetSurchargesRepository(resultPlaceIds)
  
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
          rate: allSurcharges.find((surcharge) => surcharge.id === place.id)?.rate,
          totalAmount: allSurcharges.find((surcharge) => surcharge.id === place.id)?.totalAmount,
          reportedDate: allSurcharges.find((surcharge) => surcharge.id === place.id)?.reportedDate,
          surchargeAmount: allSurcharges.find((surcharge) => surcharge.id === place.id)?.surchargeAmount,
          surchargeStatus: allSurcharges.find((surcharge) => surcharge.id === place.id)?.surchargeStatus as SurchargeStatus,
        }
      })
  
      return {
        places: placesWithSurcharges,
        nextPageToken: undefined,
      }
  
    } catch (error) {
      throw error
    }

  } else {

    if (request.userLocation) {
      if (!isPointInRectangle(request.userLocation, locationRestrictionOfNZ)) {
        throw new Error("User location is out of New Zealand")
      }
    }
    resultPlaces = await GetPlacesRepository(
      {
        searchText: request.searchText,
        nextPageToken: request.nextPageToken,
        userLocation: request.userLocation,
      }
    )
  }

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