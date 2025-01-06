import { PlaceDTO } from "../place/DTO/PlaceDTO";
import { AddressComponentsDTO } from "../place/DTO/AddressComponentsDTO";
import { GetPlacesRepositoryResponse } from "./DTO/GetPlacesRepositoryResponse";

const locationRestrictionOfNZ = {
  rectangle: {
    low: {
      latitude: -47.0,
      longitude: 166.0,
    },
    high: {
      latitude: -34.0,
      longitude: 178.0,
    },
  },
};

export async function GetPlacesRepository(
  searchText: string,
  nextPageToken?: string
): Promise<GetPlacesRepositoryResponse> {
  console.log("searchFor: ", searchText);
  console.log("nextPageToken: ", nextPageToken);

  const body: string =
    nextPageToken && nextPageToken !== ""
      ? JSON.stringify({
          textQuery: searchText,
          locationRestriction: locationRestrictionOfNZ,
          pageToken: nextPageToken,
        })
      : JSON.stringify({
          textQuery: searchText,
          locationRestriction: locationRestrictionOfNZ,
        });

  try {
    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY ?? "",
        "X-Goog-FieldMask": "nextPageToken,places.id,places.displayName,places.addressComponents",
      },
      body: body,
    });

    const data = await response.json();
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
            };
          }),
          location: null,
        };
      }),
      nextPageToken: data.nextPageToken,
    };
  } catch (error) {
    console.error("Error occurred while fetching places:", error);
    throw error; 
  }
}
