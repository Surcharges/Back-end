import { Timestamp } from "firebase-admin/firestore";
import { CustomRequestPlace } from '../DTO/GetPlaceRepositoryResponse';

export interface getPlaceFullRepositoryResponse extends CustomRequestPlace{
    rate?: number,
    reportedDate?: Timestamp
}