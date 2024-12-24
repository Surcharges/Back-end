import { SurchargeDTO } from "../DTO/SurchargeDTO";
import { db } from "src"; 

export async function GetSurchargeRepo(id: string): Promise<SurchargeDTO> {
  try {

    let placeId = id
    const surchargeReq = await db.collection('surcharge')
    .where("placeInformation", "==", placeId)
    .get()
    // const doc = await db.collection("surcharges").doc(id).get();

    if (surchargeReq.empty) {
        console.error(`Surcharge with place id ${placeId} not found.`);
    }

    const surcharge = surchargeReq.docs[0]
    const data = surcharge.data();
    if (!data) {
        throw new Error("Data is undefined for the given surcharge.");
    }

    const result: SurchargeDTO = {
        id: data.id,
        picture: data.picture || undefined, // Map picture field if present
        placeInformation: placeId, // Convert Firestore reference to string
        rate: data.rate,
        reportedDate: data.reportedDate, // Keep as Firestore Timestamp
        totalAmount: data.totalAmount,
        surchargeAmount: data.surchargeAmount,
        purchaseAmount: data.purchaseAmount,
    };

    return result;
} catch (error) {
    console.error("Error fetching surcharge:", error);
    throw error;
}
}