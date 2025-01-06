export enum SurchargeStatus{
  REPORTED,
  CONFIRMED,
  UNKNOWN
}

export type GetSurchargeUsecaseResponse = {
  placeInformation: string;
  rate: number,
  reportedDate: number
  totalAmount: number,
  surchargeAmount: number,
  surchargeStatus: SurchargeStatus
}