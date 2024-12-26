import { SurchargeDTO } from "../DTO/GetSurchargeDTO"
import { database } from "@data/firebase"

export async function GetSurchargeRepo(id: string): Promise<SurchargeDTO> {
  try {

    let placeId = id
    const place = await database.collection('surcharges').doc(id).get()

    // .where("placeInformation", "==", placeId)
    // .get()

    // const doc = await db.collection("surcharges").doc(id).get();

    // if (surchargeReq.empty) {
    //     console.error(`Surcharge with place id ${placeId} not found.`);
    // }

    // const surcharge = await surchargeReq.get()
    const data = place.data();

    console.log(data)
    
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

    console.log("Surcharge fetched successfully:", result);

    return result;
} catch (error) {
    console.error("Error fetching surcharge:", error);
    throw error;
}
}