export type PostSurchargeUsecaseRequest = {
    placeId: string,
    image: string,
    rate?: number,
    totalAmount?: number,
    surchargeAmount?: number,
}