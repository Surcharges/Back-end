import { GetPlaceUsecaseResponse } from '../../place/entity/GetPlaceUsecaseResponse'

export type GetPlacesUsecaseResponse = {
  places: GetPlaceUsecaseResponse[],
  nextPageToken?: string
}