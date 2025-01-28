export type GetPlacesRepositoryRequest = {
  searchText: string
  nextPageToken?: string
  userLocation?: { latitude: number, longitude: number }
}