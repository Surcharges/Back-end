// import { GetSurchargeRepositoryFromGetPlacesResponse } from './DTO/GetSurchargeRepositoryFromGetPlacesResponse'
// import { placesResultsDTO } from "@data/place";
import { database } from "@data/firebase"
// import { getFirestore } from "@firebase/firestore";

export async function GetSurchargeRepositoryFromGetPlaces(surchargesIdsArray: any): Promise<any> {
  try {

    const surchargesIdsArrayAsReferences = surchargesIdsArray.map((id: string) =>
      database.doc(id) // Converts the string to a Firestore DocumentReference
    );

    const querySnapshot = await database.collection("surcharges")
      .where("placeInformation", "in", surchargesIdsArrayAsReferences) // Firestore allows querying with an "in" operator for multiple IDs
      .get();
    
    let results: Record<string, number> = {}
    querySnapshot.forEach((doc) => {
      results[doc.id] = doc.data().rate;
    });


    return results;
    // const dbRef = database.collection('surcharges')
    // const docRef = dbRef.doc(surchargesIdsArray.id)
    // const doc = await docRef.get()
    
    // if (!doc.exists) {
    //   console.log(`Document for placeId ${placeId} does not exist.`);
    //   return { rate: undefined };
    // }
    
    // const data = doc.data(); 
    // if (!data) {
    //   console.log(`Data for placeId ${placeId} is undefined.`);
    //   return { rate: undefined };
    // } else {
    //   const result: GetSurchargeRepositoryFromGetPlacesResponse = {
    //     rate: data.rate, 
    //   };
    //   console.log(`Surcharge rate for placeId ${placeId} fetched sucessfully, which is: ${data.rate}`);
    //   return result
    // }
  
  } catch (error) {
    console.error("Error fetching surcharge:", error);
    throw error;
  }
}