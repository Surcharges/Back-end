
export type PostSurchargeDTO = {
    id: string,
    picture: string,
    placeInformation: string;
    rate: number,
    totalAmount?: number,
    surchargeAmount?: number,
    purchaseAmount?: number
}