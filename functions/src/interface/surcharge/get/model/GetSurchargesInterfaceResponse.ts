import express from 'express'
import { GetSurchargeUsecaseResponse } from "@domain/surcharge"

export interface Response extends express.Response {
  status(status: number): any
  send(data: GetSurchargeUsecaseResponse[]): any
}