import { PlaceDTO } from "../place/DTO/PlaceDTO"
import { AddressComponentsDTO } from "../place/DTO/AddressComponentsDTO"
import { GetPlacesRepositoryResponse } from "./DTO/GetPlacesRepositoryResponse"
import { GetPlacesRepositoryRequest } from "./DTO/GetPlacesRepositoryRequest"
import { locationRestrictionOfNZ } from "@shared/constants"
import { database } from "@data/firebase"

export function GetPlacesRepository(request: GetPlacesRepositoryRequest): Promise<GetPlacesRepositoryResponse>
export function GetPlacesRepository(placesIds: string[]): Promise<GetPlacesRepositoryResponse>

export async function GetPlacesRepository(param: GetPlacesRepositoryRequest | string[]): Promise<GetPlacesRepositoryResponse> {
  if (Array.isArray(param)) {
    return await _GetPlacesFromFirestore(param)
  } else {
    const request = param as GetPlacesRepositoryRequest
    return await _GetPlacesFromGoogle(request.searchText, request.nextPageToken, request.userLocation)
  }
}

async function _GetPlacesFromFirestore(
  placesIds: string[]
): Promise<GetPlacesRepositoryResponse> {
  try {
    const placesSnapshot = await database
      .collection('places')
      .where("id", "in", placesIds)
      .get();

    if (placesSnapshot.empty) {
      console.log("Places data are undefined for the given places IDs.");
      return { places: [], nextPageToken: undefined };
    } else {
      const matchedPlaces = placesSnapshot.docs.map((doc) => {
        const data = doc.data() as PlaceDTO;
        return {
          id: data.id,
          displayName: {
            text: data.displayName.text,
            languageCode: data.displayName.languageCode,
          },
          addressComponents: data.addressComponents.map((component: AddressComponentsDTO) => {
            return {
              longText: component.longText,
              shortText: component.shortText,
              types: component.types,
              languageCode: data.displayName.languageCode,
            }
          }),
          location: null,
        };
      });

      return { places: matchedPlaces, nextPageToken: undefined };
    }
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}

async function _GetPlacesFromGoogle(
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