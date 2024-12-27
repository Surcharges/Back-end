import express from 'express'
import { GetPlaceInterfaceResponse } from "../../place/model/GetPlaceInterfaceResponse"

type GetPlacesInterfaceResponse = {
  places: GetPlaceInterfaceResponse[]
  nextPageToken?: string
}

export interface Response extends express.Response {
  status(status: number): any
  send(data: GetPlacesInterfaceResponse): any
}