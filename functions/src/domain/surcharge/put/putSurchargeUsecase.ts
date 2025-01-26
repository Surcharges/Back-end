import { PutSurchargeUsecaseRequest } from "@domain/surcharge"
// import { GetSurchargesRepository } from "@data/surcharge"
import { PutSurchargeRepository } from "@data/surcharge"
import { SurchargeStatus } from "./entity/SurchargeStatus"
import { rateCalculatorHelper } from "../helpers/rateCalculatorHelper";

export const putSurchargeUsecase = async (
  request: PutSurchargeUsecaseRequest
): Promise<{ id: string; surchargeAmount?: number; totalAmount?: number; rate?: number; surchargeStatus: string; action: string }> => {
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
      request.surchargeAmount,
      request.action
    );
  } else {
    return await returnUpdatedSurcharge(
      request.id,
      undefined,
      undefined,
      undefined,
      request.action
    );
  }
};

async function returnUpdatedSurcharge(
  id: string,
  rate: number | undefined,
  totalAmount: number | undefined,
  surchargeAmount: number | undefined,
  action: string
): Promise<{
  id: string;
  surchargeAmount?: number;
  totalAmount?: number;
  rate?: number;
  surchargeStatus: string;
  action: string
}> {
  let status = ''
  if(action === "CONFIRM"){
    status = SurchargeStatus.CONFIRMED
  } else if(action === "REJECT"){
    status = SurchargeStatus.REJECTED
  }
  const updatedSurcharge = {
    id,
    surchargeAmount,
    totalAmount,
    rate,
    surchargeStatus: status,
    action: action
  };

  console.log(
    "putSurchargeUsecase surchargeAmount and totalAmount:",
    updatedSurcharge.surchargeAmount,
    updatedSurcharge.totalAmount,
    action,
    id
  );

  await PutSurchargeRepository(updatedSurcharge);
  return updatedSurcharge;
}