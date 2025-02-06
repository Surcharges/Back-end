import { Timestamp } from "firebase-admin/firestore";

export enum SurchargeStatus {
  REPORTED = 'REPORTED',
  CONFIRMED = 'CONFIRMED',
  UNKNOWN = 'UNKNOWN',
  AUTO_GENERATED = 'AUTO_GENERATED',
  REJECTED = 'REJECTED'
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