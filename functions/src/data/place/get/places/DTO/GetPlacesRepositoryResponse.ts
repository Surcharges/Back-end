import { PlaceDTO } from "../../place/DTO/PlaceDTO";

export type GetPlacesRepositoryResponse = {
  places: PlaceDTO[] | [],
  nextPageToken?: string
}