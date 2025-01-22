import { storage } from "@data/firebase"
import { ImageDTO } from "@data/image"

export async function GetImageRepository(image: string): Promise<ImageDTO> {
  try {
    const [fileBuffer] = await storage.bucket().file(image).download();
    const imageBlob = new Blob([fileBuffer], { type: 'image/jpeg' });
    const imageResult: ImageDTO = {
      image: imageBlob, 
    };
    console.log(imageResult, imageBlob)
    return imageResult;

  } catch (error) {
    console.error('Error fetching place data:', error);
    throw error;
  }
}

