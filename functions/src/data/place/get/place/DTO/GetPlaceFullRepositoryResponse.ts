import { Timestamp } from "firebase-admin/firestore";
import { CustomRequestPlace } from '../DTO/GetPlaceRepositoryResponse';

export enum SurchargeStatus {
    REPORTED,
    CONFIRMED,
    UNKNOWN
  }

export interface getPlaceFullRepositoryResponse extends CustomRequestPlace{
    rate: number,
    reportedDate: Timestamp,
    surchargeStatus: SurchargeStatus
}