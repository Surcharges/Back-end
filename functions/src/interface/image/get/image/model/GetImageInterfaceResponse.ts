import express from "express"

export interface GetPlaceInterfaceResponse {
  image: string
}

export interface Response extends express.Response {
  status(status: number): any
  send(data: GetPlaceInterfaceResponse): any
}