export enum SurchargeStatus {
  REPORTED = 'REPORTED',
  CONFIRMED = 'CONFIRMED',
  UNKNOWN = 'UNKNOWN',
  AUTO_GENERATED = 'AUTO_GENERATED',
  REJECTED = 'REJECTED'
}

export type PutSurchargeRepositoryRequest = {
  id: string,
	rate?: number,
	surchargeAmount?: number,
	totalAmount?: number,
	surchargeStatus: SurchargeStatus,
  action: string
}