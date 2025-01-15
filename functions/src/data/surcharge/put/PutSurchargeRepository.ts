import { PutSurchargeRepositoryRequest } from "./DTO/PutSurchargeRepositoryRequest";
import { database } from "@data/firebase"

export async function PutSurchargeRepository(request: PutSurchargeRepositoryRequest): Promise<void> {
  try {
    const surchargesRef = database.collection('surcharges').doc(request.id); 
    await surchargesRef.set({
      totalAmount: request.totalAmount,
      surchargeAmount: request.surchargeAmount,
      surcahrgeStatus: request.surcahrgeStatus
    });

  } catch (error) {
    console.error("Error posting surcharge:", error);
    throw error; // Re-throw the error for higher-level handling if needed
  }
}