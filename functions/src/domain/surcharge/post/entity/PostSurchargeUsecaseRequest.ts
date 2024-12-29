interface location {
  latitude: number,
  longitude: number
}

interface CustomRequestPlace {
  id: string;
  name: string,
  address: string,
  location: location
}
  
export type PostSurchargeUsecaseRequest = {
    place: CustomRequestPlace,
    image: string,
    rate?: number,
    totalAmount?: number,
    surchargeAmount?: number,
}