import { PutSurchargeRepositoryRequest } from "./DTO/PutSurchargeRepositoryRequest";
import { database } from "@data/firebase"

export async function PutSurchargeRepository(request: PutSurchargeRepositoryRequest): Promise<void> {
  try {
    const dbRef = database.collection('surcharges')
    const docRef = dbRef.doc(request.id)
    const doc = await docRef.get()
    const surcharge = doc.data()
    if (!surcharge) {
      throw new Error("Surcharge data is undefined for the given id in PutSurchargeRepository.")
      } else {
        await docRef.set({
          image: surcharge.image,
          placeInformation: surcharge.placeInformation,
          rate: request.rate ?? surcharge.rate,
          reportedDate: surcharge.reportedDate,
          surchargeAmount: request.surchargeAmount ?? surcharge.surchargeAmount,
          surchargeStatus: request.surchargeStatus,
          totalAmount: request.totalAmount ?? surcharge.totalAmount
        });
        console.log("Surcharge confirmed in PutSurchargeRepository:");
      }
  } catch (error) {
    console.error("Error updating surcharge:", error);
    throw error; // Re-throw the error for higher-level handling if needed
  }
}