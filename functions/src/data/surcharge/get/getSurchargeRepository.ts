import { GetSurchargeRepositoryResponse } from './DTO/GetSurchargeRepositoryResponse'
import { database } from "@data/firebase"

export async function GetSurchargeRepo(placeId: string): Promise<GetSurchargeRepositoryResponse> {
  try {

    const place = await database.collection('surcharges').doc(placeId).get()

    const data = place.data();

    if (!data) {
      throw new Error("Data is undefined for the given surcharge.");
    }

    const result: GetSurchargeRepositoryResponse = {
      id: data.id,
      picture: data.picture, // Map picture field if present
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