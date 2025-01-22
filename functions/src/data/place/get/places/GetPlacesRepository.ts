import { PlaceDTO } from "../place/DTO/PlaceDTO"
import { AddressComponentsDTO } from "../place/DTO/AddressComponentsDTO"
import { GetPlacesRepositoryResponse } from "./DTO/GetPlacesRepositoryResponse"

export const locationRestrictionOfNZ = {
  rectangle: {
    low: {
      latitude: -47.0,
      longitude: 166.0,
    },
    high: {
      latitude: -34.0,
      longitude: 178.0,
    },
  }
}

export async function GetPlacesRepository(
  searchText: string,
  nextPageToken?: string,
  userLocation?: { latitude: number, longitude: number }
): Promise<GetPlacesRepositoryResponse> {

  const reqeust = new Map<string, any>()

  reqeust.set("textQuery", searchText)

  if (nextPageToken) {
    reqeust.set("pageToken", nextPageToken)
  }

  if (userLocation) {
    reqeust.set("locationBias", {
      "circle": {
        "center": {
          "latitude": userLocation.latitude,
          "longitude": userLocation.longitude
        },
        "radius": 1000.0
      }
    })
  } else {
    reqeust.set("locationRestriction", locationRestrictionOfNZ)
  }

  const object = Object.fromEntries(reqeust)
  const body: string = JSON.stringify(object)

  try {

    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY ?? "",
        "X-Goog-FieldMask": "nextPageToken,places.id,places.displayName,places.addressComponents",
      },
      body: body,
    })


    if (response.ok) {

      const data = await response.json()

      return {
        places: data.places.map((place: PlaceDTO) => {
          return {
            id: place.id,
            displayName: {
              text: place.displayName.text,
              languageCode: place.displayName.languageCode,
            },
            addressComponents: place.addressComponents.map((component: AddressComponentsDTO) => {
              return {
                longText: component.longText,
                shortText: component.shortText,
                types: component.types,
              }
            }),
            location: null,
          }
        }),
        nextPageToken: data.nextPageToken,
      }

    }

    const data = await response.json()

    throw new Error(data)

  } catch (error) {
    throw error
  }
}