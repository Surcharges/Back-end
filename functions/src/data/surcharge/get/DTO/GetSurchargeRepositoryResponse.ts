import { Timestamp } from "firebase-admin/firestore";

export type GetSurchargeRepositoryResponse = {
  id: string,
  picture: string,
  placeInformation: string;
  reportedDate: Timestamp,
  rate: number,
  totalAmount: number,
  surchargeAmount: number
}

