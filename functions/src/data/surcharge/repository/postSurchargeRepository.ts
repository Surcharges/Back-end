import { SurchargeDTO } from "../DTO/SurchargeDTO";
import { db } from "@src/index";

export async function postSurchargeRepo(Surcharge: SurchargeDTO): Promise<void> {
    try {
        const docRef = db.collection('surcharges').doc(Surcharge.placeInformation);

        await docRef.set({
            id: Surcharge.id || undefined,
            picture: Surcharge.picture || undefined,
            placeInformation: Surcharge.placeInformation, // Fixed to use the correct property
            rate: Surcharge.rate,
            reportedDate: Surcharge.reportedDate || undefined,
            totalAmount: Surcharge.totalAmount || undefined,
            surchargeAmount: Surcharge.surchargeAmount || undefined,
            purchaseAmount: Surcharge.purchaseAmount || undefined
        });
    } catch (error) {
        console.error("Error posting surcharge:", error);
        throw error; // Re-throw the error for higher-level handling if needed
    }
}