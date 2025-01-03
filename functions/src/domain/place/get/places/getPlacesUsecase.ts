import { GetSurchargeRepositoryFromGetPlaces } from "@data/surcharge";
import { GetPlacesUsecaseRequest } from "./entity/GetPlacesUsecaseRequest";
import { GetPlacesUsecaseResponse } from "./entity/GetPlacesUsecaseResponse";
import { GetPlacesRepository } from "@data/place";
// import { placesResultsDTO } from "@data/place";


export const getPlacesUsecase = async (
  request: GetPlacesUsecaseRequest
): Promise<GetPlacesUsecaseResponse> => {
  const resultPlaces = await GetPlacesRepository(request.searchText, request.nextPageToken);

  let resultPlacesArr: Array<any> = []
  resultPlaces.places.forEach(doc => {
    resultPlacesArr.push('places/'+ doc.id);
  });

  const resultSurcharges = await GetSurchargeRepositoryFromGetPlaces(resultPlacesArr);
  function returnRateFromId(id: string): number | undefined {
    return resultSurcharges[id];
  }

  const placesWithSurcharges = await Promise.all(
    resultPlaces.places.map(async (place) => {
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
        rate: returnRateFromId(place.id),
      };
    })
  );

  return {
    places: placesWithSurcharges,
    nextPageToken: resultPlaces.nextPageToken,
  };
};



