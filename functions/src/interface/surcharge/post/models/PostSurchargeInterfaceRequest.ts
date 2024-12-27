export type PostSurchargeInterfaceRequest = {
  id: string,
  picture: string,
  rate: number,
  totalAmount: number,
  surchargeAmount: number
}