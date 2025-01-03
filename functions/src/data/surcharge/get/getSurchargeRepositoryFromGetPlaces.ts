import { GetSurchargeRepositoryFromGetPlacesResponse } from './DTO/GetSurchargeRepositoryFromGetPlacesResponse'
import { database } from "@data/firebase"

export async function GetSurchargeRepositoryFromGetPlaces(placeId: string): Promise<GetSurchargeRepositoryFromGetPlacesResponse> {
  try {
    const dbRef = database.collection('surcharges')
    const docRef = dbRef.doc(placeId)
    const doc = await docRef.get()
    
    if (!doc.exists) {
      console.log(`Document for placeId ${placeId} does not exist.`);
      return { rate: undefined };
    }
    
    const data = doc.data(); 
    if (!data) {
      console.log(`Data for placeId ${placeId} is undefined.`);
      return { rate: undefined };
    } else {
      const result: GetSurchargeRepositoryFromGetPlacesResponse = {
        rate: data.rate, 
      };
      console.log(`Surcharge rate for placeId ${placeId} fetched sucessfully, which is: ${data.rate}`);
      return result
    }
  
  } catch (error) {
    console.error("Error fetching surcharge:", error);
    throw error;
  }
}