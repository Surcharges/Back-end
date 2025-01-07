import express from 'express'
import { GetSurchargeUsecaseResponse } from "@domain/surcharge"

export interface Response extends express.Response {
  send(data: GetSurchargeUsecaseResponse[]): any; // Extend for your use case
}