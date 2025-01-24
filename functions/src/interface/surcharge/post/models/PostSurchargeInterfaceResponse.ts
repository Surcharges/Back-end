import { Response } from "express"
import { Send } from "express-serve-static-core"
import { Place } from "@shared/types/place"
import { Surcharge } from "@shared/types/surcharge"

export type PostSurchargeInterfaceResponseData = {
  place: Place,
  surcharge: Surcharge  
}

export interface PostSurchargeInterfaceResponse<ResponseData> extends Response {
  json: Send<ResponseData, this>
}