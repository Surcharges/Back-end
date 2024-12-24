import { Timestamp } from "firebase-admin/firestore";
import { ImageDataDTO } from "./imageDataDTO"

export type SurchargeDTO = {
    id: string,
    picture?: ImageDataDTO[],
    placeInformation: string;
    rate: number,
    reportedDate: Timestamp 
    totalAmount?: number,
    surchargeAmount?: number,
    purchaseAmount?: number
    
}

