import { Request } from "../entities/Request"

import { GetPlace, PlaceDTO } from "@data/place"

export const getPlace = async (request: Request): Promise<PlaceDTO> => {

  const places = await GetPlace(request.id)
  
  return places
}