import { GetSurchargeRepositoryResponse } from './DTO/GetSurchargeRepositoryResponse'
import { database } from "@data/firebase"


export async function GetSurchargeRepo(placeId: string): Promise<GetSurchargeRepositoryResponse> {
  try {
    const dbRef = database.collection('surcharges')    
    const docRef = dbRef.doc(placeId)
    const doc = await docRef.get()
    const data = doc.data()

    if (!data) {
      throw new Error("Data is undefined for the given place.");
    }
    
    const result: GetSurchargeRepositoryResponse = {
      placeInformation: data.placeInformation, // Convert Firestore reference to string
      rate: data.rate,
      reportedDate: data.reportedDate, // Keep as Firestore Timestamp
      totalAmount: data.totalAmount,
      surchargeAmount: data.surchargeAmount,
    };
  
    console.log("Surcharge fetched successfully:", result);
  
    return result;
    
  } catch (error) {
    console.error("Error fetching surcharge:", error);
    throw error;
  }
}