import {ImageDataDTO} from "./imageDataDTO"

export type SurchargeDTO = {
    id: string,
    rate: number,
    totalAmount?: number,
    surchargeAmount?: number,
    purchaseAmount?: number,
    imageData?: ImageDataDTO[]
}

