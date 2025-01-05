import { Timestamp } from "firebase-admin/firestore";

export type GetSurchargesRepositoryResponse = {
  id: string
  placeInformation: string
  reportedDate: Timestamp
  rate: number
  totalAmount: number
  surchargeAmount: number
}