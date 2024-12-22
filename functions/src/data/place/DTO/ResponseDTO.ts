import { PlaceDTO } from "./PlaceDTO";

export type ResponseDTO = {
  places: PlaceDTO[],
  nextPageToken?: string
}