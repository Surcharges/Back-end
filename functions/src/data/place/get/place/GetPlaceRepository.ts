import { formatPlaceData } from './Helpers/formatPlaceData'
import {getPlaceFullRepositoryResponse} from './DTO/GetPlaceFullRepositoryResponse'
import { database } from '@data/firebase';
import { PostPlaceRepository } from '@data/place'
import { GetSurchargeRepo } from '@data/surcharge'

export async function GetPlaceRepository(id: string): Promise<getPlaceFullRepositoryResponse> {
  try {
    // Fetch place data from Firestore
    const placeDoc = await database.collection('places').doc(id).get();

    if (!placeDoc.exists) {
      return PostPlaceRepository(id)
    } else {
      const placeData = placeDoc.data();
      const surchargeData = await GetSurchargeRepo(id);
      
      return {
        ...formatPlaceData(placeData),
        rate: surchargeData?.rate,
        reportedDate: surchargeData?.reportedDate,
      };
    }
  } catch (error) {
    console.error('Error fetching place data:', error);
    throw error;
  }
}

