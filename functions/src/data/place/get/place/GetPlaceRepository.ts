import { CustomRequestPlace } from './DTO/GetPlaceRepositoryResponse';
import {getPlaceFullRepositoryResponse} from './DTO/GetPlaceFullRepositoryResponse'
import { database } from '@data/firebase';

export async function GetPlaceRepository(id: string): Promise<getPlaceFullRepositoryResponse> {
  try {
    // Fetch place data from Firestore
    const placeDoc = await database.collection('places').doc(id).get();

    if (!placeDoc.exists) {
      // If no data in Firestore, fetch from external API
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
      return {...formatPlaceData(externalData)}
    } else {
      // If data exists in Firestore
      const placeData = placeDoc.data();
      if (!placeData) {
        throw new Error('Firestore data is empty or undefined');
      }

      const surchargeDoc = await database.collection('surcharges').doc(id).get();
      const surchargeData = surchargeDoc.exists ? surchargeDoc.data() : {};

      return {
        ...formatPlaceData(placeData),
        rate: surchargeData?.rate ?? null,
        reportedDate: surchargeData?.reportedDate ?? null,
      };
    }
  } catch (error) {
    console.error('Error fetching place data:', error);
    throw error;
  }
}

function formatPlaceData(data: any): CustomRequestPlace {
  return {
    id: data.id,
    displayName: {
      text: data.displayName?.text ?? '',
      languageCode: data.displayName?.languageCode ?? '',
    },
    addressComponents: (data.addressComponents ?? []).map((component: any) => ({
      longText: component.longText,
      shortText: component.shortText,
      types: component.types,
      languageCode: component.languageCode,
    })),
    location: {
      latitude: data.location?.latitude ?? 0,
      longitude: data.location?.longitude ?? 0,
    },
  };
}
