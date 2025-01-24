import { Timestamp } from "firebase-admin/firestore"
import { SurchargeStatus } from "./SurchargeStatus"

export type Surcharge = {
  rate?: number
  reportedDate?: Timestamp
  status: SurchargeStatus
}