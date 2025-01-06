import { formatPlaceData } from './Helpers/formatPlaceData'
import { getPlaceFullRepositoryResponse } from './DTO/GetPlaceFullRepositoryResponse'
import { GetPlaceShortRepositoryResponse } from './DTO/getPlaceShortRepositoryResponse'
import { SurchargeStatus } from "@data/surcharge"
import { database } from '@data/firebase';
import { PostPlaceRepository } from '@data/place'
import { GetSurchargesRepository } from '@data/surcharge'

export async function GetPlaceRepository(id: string): Promise<any> {
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
      return <GetPlaceShortRepositoryResponse> {
        ...formatPlaceData(externalData),
        rate: undefined,
        reportedDate: undefined,
        surchargeStatus: SurchargeStatus.UNKNOWN
      }

    } else {
      const placeData = placeDoc.data();
      const surchargeData = await GetSurchargesRepository(id);
      
      return <getPlaceFullRepositoryResponse> {
        ...formatPlaceData(placeData),
        rate: surchargeData?.rate,
        reportedDate: surchargeData?.reportedDate,
        surchargeStatus: surchargeData.surchargeStatus
      };
    }
  } catch (error) {
    console.error('Error fetching place data:', error);
    throw error;
  }
}

