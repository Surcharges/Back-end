import { PutSurchargeUsecaseRequest } from "@domain/surcharge"
// import { GetSurchargesRepository } from "@data/surcharge"
import { PutSurchargeRepository } from "@data/surcharge"
import { SurchargeStatus } from "./entity/SurchargeStatus"
import { rateCalculatorHelper } from "../helpers/rateCalculatorHelper";

export const putSurchargeUsecase = async (
  request: PutSurchargeUsecaseRequest
): Promise<{ id: string; surchargeAmount?: number; totalAmount?: number; rate?: number; surchargeStatus: SurchargeStatus }> => {
  let newRate: number | undefined = undefined;

  if (request.totalAmount && request.surchargeAmount) {
    newRate = rateCalculatorHelper(
      undefined,
      request.totalAmount,
      request.surchargeAmount
    );
    return await returnUpdatedSurcharge(
      request.id,
      newRate,
      request.totalAmount,
      request.surchargeAmount
    );
  } else {
    return await returnUpdatedSurcharge(
      request.id,
      undefined,
      undefined,
      undefined
    );
  }
};

async function returnUpdatedSurcharge(
  id: string,
  rate: number | undefined,
  totalAmount: number | undefined,
  surchargeAmount: number | undefined
): Promise<{
  id: string;
  surchargeAmount?: number;
  totalAmount?: number;
  rate?: number;
  surchargeStatus: SurchargeStatus;
}> {
  const updatedSurcharge = {
    id,
    surchargeAmount,
    totalAmount,
    rate,
    surchargeStatus: SurchargeStatus.CONFIRMED,
  };

  console.log(
    "putSurchargeUsecase surchargeAmount and totalAmount:",
    updatedSurcharge.surchargeAmount,
    updatedSurcharge.totalAmount
  );

  await PutSurchargeRepository(updatedSurcharge);
  return updatedSurcharge;
}