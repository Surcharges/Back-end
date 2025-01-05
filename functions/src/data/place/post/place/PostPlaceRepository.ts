import { database } from "@data/firebase"
import { PostPlaceRepositoryRequest } from "./DTO/PostPlaceRepositoryRequest"

export async function PostPlaceRepository(request: PostPlaceRepositoryRequest ): Promise<void> {
  try {
      const placesRef = database.collection('places').doc(request.id);
      await placesRef.set(request)

    } catch (error) {
      console.error('Error fetching place data:', error);
      throw error;
    }
  
}