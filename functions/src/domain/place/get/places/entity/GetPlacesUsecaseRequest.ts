export type GetPlacesUsecaseRequest = {
  searchText: string,
  userLocation?: { latitude: number, longitude: number },
  nextPageToken?: string
}