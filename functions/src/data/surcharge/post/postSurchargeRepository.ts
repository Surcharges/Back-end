import { PostSurchargeRepositoryRequest } from "./DTO/PostSurchargeRepositoryRequest"
import { database } from "@data/firebase"
import { storage } from "@data/firebase"
import { Timestamp } from "firebase-admin/firestore"

export async function PostSurchargeRepo(request: PostSurchargeRepositoryRequest): Promise<Timestamp> {
  
  try {

    const surchargesRef = database.collection('surcharges').doc(request.placeId)
    const buffer = Buffer.from(request.image, 'base64')
    const { v4: uuid } = require('uuid')
    const fileName = `reported/${uuid()}.jpg`
    const file = storage.bucket().file(fileName)
    await file.save(buffer, { contentType: 'image/jpeg' })

    const timestamp = Timestamp.now()

    await surchargesRef.set({
      image: fileName,
      placeInformation: database.doc('places/' + request.placeId),
      rate: request.rate,
      reportedDate: timestamp,
      totalAmount: request.totalAmount,
      surchargeAmount: request.surchargeAmount,
      surchargeStatus: request.surchargeStatus
    })

    return timestamp

  } catch (error) {
    throw error
  }
}