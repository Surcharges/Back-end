import { Timestamp } from "firebase-admin/firestore";

export enum SurchargeStatus {
  REPORTED = 'REPORTED',
  CONFIRMED = 'CONFIRMED',
  UNKNOWN = 'UNKNOWN'
}

export type GetSurchargesRepositoryResponse = {
  id: string
  image?: string
  placeInformation: string
  reportedDate: Timestamp
  rate: number
  totalAmount: number
  surchargeAmount: number
  surchargeStatus: SurchargeStatus
}