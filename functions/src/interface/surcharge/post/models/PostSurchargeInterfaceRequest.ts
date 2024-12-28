export type PostSurchargeInterfaceRequest = {
  placeId: string,
  image: string,
  rate: number,
  totalAmount: number,
  surchargeAmount: number
}