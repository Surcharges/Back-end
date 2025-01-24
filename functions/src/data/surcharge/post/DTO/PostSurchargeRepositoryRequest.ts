import { SurchargeStatus } from "@shared/types/surcharge"

export type PostSurchargeRepositoryRequest = {
  placeId: string,
  image: string,
  rate: number,
  totalAmount: number,
  surchargeAmount: number,
  surchargeStatus: SurchargeStatus
}

export { SurchargeStatus }