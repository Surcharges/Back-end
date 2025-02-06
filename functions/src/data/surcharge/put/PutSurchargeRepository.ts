import { SurchargeStatus } from "@domain/surcharge";
import { PutSurchargeRepositoryRequest } from "./DTO/PutSurchargeRepositoryRequest";
import { database } from "@data/firebase"
import { storage } from "@data/firebase";

export async function PutSurchargeRepository(request: PutSurchargeRepositoryRequest): Promise<void> {
  try {
    console.log("PutSurchargeRepository ID: ", request.id)
    const dbRef = database.collection('surcharges')
    const docRef = dbRef.doc(request.id)
    const doc = await docRef.get()
    const surcharge = doc.data()

    if (!docRef || !surcharge ) {
      throw new Error("Surcharge data is undefined for the given id in PutSurchargeRepository.")
      } else {
        function newFolder(surchargeImage: string, status: SurchargeStatus){
          if (request.action === "CONFIRM" && status === SurchargeStatus.REPORTED){
            return `confirmed/${surchargeImage.substring(9)}` // from "reported/..." to "confirmed/.."
          } else if (request.action === "REJECT" && status === SurchargeStatus.REPORTED){
            return `rejected/${surchargeImage.substring(9)}`  // from "reported/..." to "rejected/.."
          } else if (request.action === "CONFIRM" && status === SurchargeStatus.REJECTED){
            return `confirmed/${surchargeImage.substring(9)}` // from "rejected/..." to "confirmed/.."
          } else if (request.action === "REJECT" && status === SurchargeStatus.CONFIRMED){
            return `rejected/${surchargeImage.substring(10)}` // from "confirmed/..." to "rejected/.."
          } else return surchargeImage
        }

        try {
          const imageRef = storage.bucket().file(surcharge.image);
          const [fileBuffer] = await imageRef.download();
          const newFileRef = storage.bucket().file(newFolder(surcharge.image, surcharge.surchargeStatus));
          await newFileRef.save(fileBuffer, { contentType: 'image/jpeg' });
          await imageRef.delete();
          console.log(`Image moved to ${newFileRef.name} and deleted from the previous location.`);
      } catch (error) {
          console.error("An error occurred while moving the image:", error);
      }
        
      
        await docRef.set({
          image: newFolder(surcharge.image, surcharge.surchargeStatus),
          placeInformation: surcharge.placeInformation,
          rate: request.rate ?? surcharge.rate,
          reportedDate: surcharge.reportedDate,
          surchargeAmount: request.surchargeAmount ?? surcharge.surchargeAmount,
          surchargeStatus: request.surchargeStatus,
          totalAmount: request.totalAmount ?? surcharge.totalAmount
        });

        // return {
        //   image: imageNameWithNewFolder,
        //   placeInformation: surcharge.placeInformation,
        //   rate: request.rate ?? surcharge.rate,
        //   reportedDate: surcharge.reportedDate,
        //   surchargeAmount: request.surchargeAmount ?? surcharge.surchargeAmount,
        //   surchargeStatus: request.surchargeStatus,
        //   totalAmount: request.totalAmount ?? surcharge.totalAmount
        // }
        console.log("Surcharge confirmed in PutSurchargeRepository:");
      }
  } catch (error) {
    console.error("Error updating surcharge:", error);
    throw error; // Re-throw the error for higher-level handling if needed
  }
}