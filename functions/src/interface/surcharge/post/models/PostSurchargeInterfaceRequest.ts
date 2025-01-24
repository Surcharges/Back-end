import express from "express"

export interface PostSurchargeInterfaceRequest extends express.Request {
  body: {
    placeId: string
    totalAmount: number
    surchargeAmount: number
    image: string
  }
}