export enum SurchargeStatus{
  REPORTED = 'REPORTED',
  CONFIRMED = 'CONFIRMED',
  UNKNOWN = 'UNKNOWN'
}

export type GetSurchargeUsecaseResponse = {
  image?: string,
  placeInformation: string;
  rate: number,
  reportedDate: number
  totalAmount: number,
  surchargeAmount: number,
  surchargeStatus: SurchargeStatus
}