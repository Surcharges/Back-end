import { PostSurchargeRepositoryRequest } from "./DTO/PostSurchargeRepositoryRequest";
import { database } from "@data/firebase"
import { storage } from "@data/firebase"
import { Timestamp } from "firebase-admin/firestore"


export async function PostSurchargeRepo(request: PostSurchargeRepositoryRequest): Promise<void> {
  try {
    const docRef = database.collection('surcharges').doc(request.id);

    const buffer = Buffer.from(request.picture, 'base64')

    const { v4: uuid } = require('uuid')
    const fileName = `${uuid()}.jpg`

    const file = storage.bucket().file(fileName)
    await file.save(buffer, { contentType: 'image/jpeg' })

    await docRef.set({
      picture: fileName,
      rate: request.rate,
      reportedDate: Timestamp.now(),
      totalAmount: request.totalAmount,
      surchargeAmount: request.surchargeAmount
    });

  } catch (error) {
    console.error("Error posting surcharge:", error);
    throw error; // Re-throw the error for higher-level handling if needed
  }
}