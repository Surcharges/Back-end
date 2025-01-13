export enum SurchargeStatus{
  REPORTED = 'REPORTED',
  CONFIRMED = 'CONFIRMED',
  UNKNOWN = 'UNKNOWN'
}

export type GetSurchargeUsecaseResponse = {
  placeInformation: string;
  rate: number,
  reportedDate: number
  totalAmount: number,
  surchargeAmount: number,
  surchargeStatus: SurchargeStatus
}