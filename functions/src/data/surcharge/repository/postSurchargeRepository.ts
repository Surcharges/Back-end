import { SurchargeDTO } from "../DTO/SurchargeDTO";
import { database } from "@data/firebase";
import { storage } from "@data/firebase";

export async function PostSurchargeRepo(Surcharge: SurchargeDTO): Promise<void> {
    try {
        const docRef = database.collection('surcharges').doc(Surcharge.placeInformation);

        const buffer = Buffer.from(Surcharge.picture, 'base64')

        const file = storage.bucket().file('/image.jpg')
        await file.save(buffer, { contentType: 'image/jpeg' })
    
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