import { PostSurchargeRepositoryRequest } from "./DTO/PostSurchargeRepositoryRequest";
import { database } from "@data/firebase"
import { storage } from "@data/firebase"
import { Timestamp } from "firebase-admin/firestore"
import { GeoPoint } from "firebase-admin/firestore";
import { PostPlaceRepository } from '@data/place/post/place/PostPlaceRepository'

export async function PostSurchargeRepo(request: PostSurchargeRepositoryRequest): Promise<void> {
  try {

    const locationGeoPoint = new GeoPoint(request.place.location.latitude, request.place.location.longitude)
    request.place.location = locationGeoPoint

    const surchargesRef = database.collection('surcharges').doc(request.place.id);
    
    const placeDocCheck = await database.collection('places').doc(request.place.id).get();
    if(!placeDocCheck.exists){
      PostPlaceRepository(request.place.id)
      database.collection('places').doc(request.place.id).set(request.place)
    }
    
    const buffer = Buffer.from(request.image, 'base64')
    const { v4: uuid } = require('uuid')
    const fileName = `${uuid()}.jpg`
    const file = storage.bucket().file(fileName)
    await file.save(buffer, { contentType: 'image/jpeg' })

    await surchargesRef.set({
      image: fileName,
      placeInformation: database.doc('places/' + request.place.id),
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