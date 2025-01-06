import { GetPlaceRepository } from "@data/place";
import { GetPlaceUsecaseRequest } from "./entity/GetPlaceUsecaseRequest";
import { GetPlaceUsecaseResponse } from "./entity/GetPlaceUsecaseResponse";

export const getPlaceUsecase = async (request: GetPlaceUsecaseRequest): Promise<GetPlaceUsecaseResponse> => {
  const result = await GetPlaceRepository(request.id);

  return {
    id: result.id,
    displayName: {
      text: result.displayName.text,
      languageCode: result.displayName.languageCode,
    },
    addressComponents: (result.addressComponents ?? []).map((component: any) => ({
      longText: component.longText,
      shortText: component.shortText,
      types: component.types,
      languageCode: component.languageCode,
    })),
    location: {
      latitude: result.location?.latitude ?? 0,
      longitude: result.location?.longitude ?? 0,
    },
    rate: result.rate,
    reportedDate: result.reportedDate,
    surchargeStatus: result.surchargeStatus
  };
};
