import express from "express"

type LocalizedText = {
  text: string,
  languageCode: string
}

type AddressComponents = {
  longText: string,
  shortText: string,
  types: string[],
  languageCode: string
}

type LatLng = {
  latitude: number,
  longitude: number
}

export interface GetPlaceInterfaceResponse {
  id: string
  displayName: LocalizedText
  addressComponents: AddressComponents[]
  location: LatLng
}

export interface Response extends express.Response {
  status(status: number): any
  send(data: GetPlaceInterfaceResponse): any
}