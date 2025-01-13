import { GetPlaceRepository } from "@data/place";
import { GetPlaceUsecaseRequest } from "./entity/GetPlaceUsecaseRequest";
import { GetPlaceUsecaseResponse } from "./entity/GetPlaceUsecaseResponse";
import { GetSurchargesRepository } from '@data/surcharge'
import { SurchargeStatus } from "@data/surcharge"

export const getPlaceUsecase = async (request: GetPlaceUsecaseRequest): Promise<GetPlaceUsecaseResponse> => {
  const result = await GetPlaceRepository(request.id);
  const surchargeData = await GetSurchargesRepository(request.id);

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
    rate: surchargeData?.rate ?? undefined, 
    reportedDate: surchargeData?.reportedDate ?? undefined, // Default to 0 if reportedDate is undefined
    surchargeStatus: surchargeData?.surchargeStatus ?? SurchargeStatus.UNKNOWN,
  };
};
