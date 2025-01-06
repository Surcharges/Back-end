import { Timestamp } from "firebase-admin/firestore";
import { CustomRequestPlace } from './GetPlaceRepositoryResponse';

export enum SurchargeStatus {
    REPORTED,
    CONFIRMED,
    UNKNOWN
  }

export interface GetPlaceShortRepositoryResponse extends CustomRequestPlace{
    rate?: number,
    reportedDate?: Timestamp,
    surchargeStatus?: SurchargeStatus
}