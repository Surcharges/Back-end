import { GetSurchargesRepositoryResponse, SurchargeStatus } from './DTO/GetSurchargesRepositoryResponse'
import { database } from "@data/firebase"

export function GetSurchargesRepository(placeId: string): Promise<GetSurchargesRepositoryResponse>
export function GetSurchargesRepository(placeIds: string[]): Promise<GetSurchargesRepositoryResponse[]>
export function GetSurchargesRepository({}): Promise<GetSurchargesRepositoryResponse[]>

export async function GetSurchargesRepository(param: string | string[] | {}): Promise<GetSurchargesRepositoryResponse | GetSurchargesRepositoryResponse[] | {}> {
  if (param === undefined || (typeof param === 'object' && Object.keys(param).length === 0)) {
    return await _GetAllSurcharges();
  } else if (typeof param === 'string') {
    return await _GetSurcharge(param);
  } else if (Array.isArray(param)) {
    return await _GetSurcharges(param);
  } else {
    throw new Error("Invalid parameter provided to GetSurchargesRepository.");
  }
}

async function _GetSurcharge(placeId: string): Promise<GetSurchargesRepositoryResponse | {} > {
  try {
    const dbRef = database.collection('surcharges')
    const docRef = dbRef.doc(placeId)
    const doc = await docRef.get()
    const surcharge = doc.data()
    if (!surcharge) {
      console.log("Surcharge data is undefined for the given place.");
      return {}
    } else {
      const result: GetSurchargesRepositoryResponse = {
        id: surcharge.id,
        placeInformation: surcharge.placeInformation, // Convert Firestore reference to string
        rate: surcharge.rate,
        reportedDate: surcharge.reportedDate, // Keep as Firestore Timestamp
        totalAmount: surcharge.totalAmount,
        surchargeAmount: surcharge.surchargeAmount,
        surchargeStatus: surcharge.surchargeStatus
      };
      console.log("Surcharge fetched successfully:", result);
      return result;
    }
  } catch (error) {
    console.error("Error fetching surcharge:", error);
    throw error;
  }
}

async function _GetSurcharges(placeIds: string[]): Promise<GetSurchargesRepositoryResponse[] | {}> {
  try {
    const surchargesPlaceReferences = placeIds.map((placeId) => {
      return database.doc('places/' + placeId) // Firestore reference
    })
    const surcharges = await database
      .collection('surcharges')
      .where("placeInformation", "in", surchargesPlaceReferences) // Firestore allows querying with an "in" operator for multiple IDs
      .get()
    if (!surcharges){
      console.log("Surcharges data are undefined for the given places ids.");
      return {}
    } else {
      const matchedSurcharges = surcharges.docs.map((surcharge) => {
        const data = surcharge.data()
        return {
          id: surcharge.id,
          placeInformation: data.placeInformation, // Convert Firestore reference to string
          rate: data.rate,
          reportedDate: data.reportedDate, // Keep as Firestore Timestamp
          totalAmount: data.totalAmount,
          surchargeAmount: data.surchargeAmount,
          surchargeStatus: data.surchargeStatus as SurchargeStatus
        }
      })
      return matchedSurcharges
    } 
  } catch (error) {
    console.error("Error fetching surcharges:", error);
    throw error;
  }
}

async function _GetAllSurcharges(): Promise<GetSurchargesRepositoryResponse[] | {}> {
  try {
    const surcharges = await database
      .collection('surcharges')
      .get()
    if (!surcharges){
      console.log('There is no surcharges data yet')
      return {}
    } else{
      const AllSurcharges = surcharges.docs.map((surcharge) => {
        const data = surcharge.data()
        return {
          id: surcharge.id,
          image: data.image,
          placeInformation: data.placeInformation, // Convert Firestore reference to string
          rate: data.rate,
          reportedDate: data.reportedDate, // Keep as Firestore Timestamp
          totalAmount: data.totalAmount,
          surchargeAmount: data.surchargeAmount,
          surchargeStatus: data.surchargeStatus
        }
      })
      console.log("All surcharges fetched successfully:", AllSurcharges);
      return AllSurcharges
    }
  } catch (error) {
    console.error("Error fetching surcharges:", error);
    throw error;
  }
}