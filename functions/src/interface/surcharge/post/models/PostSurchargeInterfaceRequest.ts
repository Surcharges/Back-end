export type PostSurchargeInterfaceRequest = {
  placeId: string,
  image: File,
  rate?: number,
  totalAmount?: number,
  surchargeAmount?: number
}