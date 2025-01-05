import { formatPlaceData } from './Helpers/formatPlaceData'
import {getPlaceFullRepositoryResponse} from './DTO/GetPlaceFullRepositoryResponse'
import { database } from '@data/firebase';
import { PostPlaceRepository } from '@data/place/post/place/PostPlaceRepository'
import { GetSurchargeRepo } from '@data/surcharge/get/getSurchargeRepository'
import { GetSurchargeRepositoryResponse } from '@data/surcharge/get/DTO/GetSurchargeRepositoryResponse'

export async function GetPlaceRepository(id: string): Promise<getPlaceFullRepositoryResponse> {
  try {
    // Fetch place data from Firestore
    const placeDoc = await database.collection('places').doc(id).get();

    if (!placeDoc.exists) {
      return PostPlaceRepository(id)
    } else {
      const placeData = placeDoc.data();
      const surchargeData = await GetSurchargeRepo(id);
      const isSurchargeData = (data: any): data is GetSurchargeRepositoryResponse => {
        return data && 'rate' in data && 'reportedDate' in data;
      };

      return {
        ...formatPlaceData(placeData),
        rate: isSurchargeData(surchargeData) ? surchargeData.rate : undefined,
        reportedDate: isSurchargeData(surchargeData) ? surchargeData.reportedDate : undefined,
      };
    }
  } catch (error) {
    console.error('Error fetching place data:', error);
    throw error;
  }
}

