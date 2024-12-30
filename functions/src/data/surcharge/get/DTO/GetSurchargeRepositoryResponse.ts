import { Timestamp } from "firebase-admin/firestore";

export type GetSurchargeRepositoryResponse = {
  placeInformation: string;
  reportedDate: Timestamp,
  rate: number,
  totalAmount: number,
  surchargeAmount: number
}

