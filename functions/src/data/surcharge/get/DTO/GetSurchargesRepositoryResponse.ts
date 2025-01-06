import { Timestamp } from "firebase-admin/firestore";

export enum SurchargeStatus {
  REPORTED,
  CONFIRMED,
  UNKNOWN
}

export type GetSurchargesRepositoryResponse = {
  id: string
  placeInformation: string
  reportedDate: Timestamp
  rate: number
  totalAmount: number
  surchargeAmount: number,
  surchargeStatus: SurchargeStatus
}