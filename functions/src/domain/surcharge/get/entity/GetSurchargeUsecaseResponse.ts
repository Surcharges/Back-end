export enum SurchargeStatus{
  REPORTED = 'REPORTED',
  CONFIRMED = 'CONFIRMED',
  UNKNOWN = 'UNKNOWN',
  AUTO_GENERATED = 'AUTO_GENERATED',
  REJECTED = 'REJECTED'
}

export type GetSurchargeUsecaseResponse = {
  id: string,
  image?: string,
  placeInformation: string;
  rate: number,
  reportedDate: number
  totalAmount: number,
  surchargeAmount: number,
  surchargeStatus: SurchargeStatus
}