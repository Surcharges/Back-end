export enum SurchargeStatus {
  REPORTED = 'REPORTED',
  CONFIRMED = 'CONFIRMED',
  UNKNOWN = 'UNKNOWN'
}

export type PutSurchargeRepositoryRequest = {
  id: string,
	surchargeAmount?: number,
	totalAmount?: number,
	surcahrgeStatus: SurchargeStatus
}