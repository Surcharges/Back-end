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
      // If no data in Firestore, fetch from external Google Places API
      const response = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY ?? '',
          'X-Goog-FieldMask': 'id,displayName,addressComponents,location',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not okay');
      }
      const externalData = await response.json();
      await PostPlaceRepository(formatPlaceData(externalData))
      return {...formatPlaceData(externalData)}

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

