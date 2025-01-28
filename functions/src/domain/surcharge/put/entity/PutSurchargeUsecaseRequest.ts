export type PutSurchargeUsecaseRequest = {
    id: string,
    surchargeAmount? : number,
    totalAmount? : number,
    action: string
}