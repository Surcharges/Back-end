import { database } from "@data/firebase"
import { PostPlaceRepositoryRequest } from "./DTO/PostPlaceRepositoryRequest"
import { formatPlaceData } from '@data/place/get/place/Helpers/formatPlaceData'

export async function PostPlaceRepository(id: string ): Promise<PostPlaceRepositoryRequest> {

  try {
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
      const placesRef = database.collection('places').doc(externalData.id);
      await placesRef.set(externalData)
      return {...formatPlaceData(externalData)}

    } catch (error) {
      console.error('Error fetching place data:', error);
      throw error;
    }
  
}