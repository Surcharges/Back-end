export enum SurchargeStatus {
  REPORTED = 'REPORTED',
  CONFIRMED = 'CONFIRMED',
  UNKNOWN = 'UNKNOWN'
}

export type PutSurchargeRepositoryRequest = {
  id: string,
	rate?: number,
	surchargeAmount?: number,
	totalAmount?: number,
	surchargeStatus: SurchargeStatus
}