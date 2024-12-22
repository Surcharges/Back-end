import { Request } from "../entities/Request"

import { GetPlaces } from "@data/place"
import { ResponseDTO } from "@data/place"

export const getPlaces = async (request: Request): Promise<ResponseDTO> => {

  const places = await GetPlaces(request.searchText, request.nextPageToken)
  
  return places
}