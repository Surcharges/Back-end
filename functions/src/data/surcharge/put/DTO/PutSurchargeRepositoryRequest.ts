export enum SurchargeStatus {
  REPORTED = 'REPORTED',
  CONFIRMED = 'CONFIRMED',
  UNKNOWN = 'UNKNOWN',
  REJECTED = 'REJECTED',
  AUTO_GENERATED = 'AUTO_GENERATED'
}

export type PutSurchargeRepositoryRequest = {
  id: string,
	rate?: number,
	surchargeAmount?: number,
	totalAmount?: number,
	surchargeStatus: SurchargeStatus,
  action: string
}