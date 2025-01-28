import { storage } from "@data/firebase";
import { ImageDTO } from "@data/image";

export async function GetImageRepository(image: string): Promise<ImageDTO> {
  try {
    const imageRef = storage.bucket().file(image);
    if (!imageRef) {
      console.log('Image does not exist in Firebase Storage');
      return { image: [] }; // Empty Base64 string if image doesn't exist
    }

    const [fileBuffer] = await imageRef.download();
    if (!fileBuffer) {
      console.log('Failed to download image from Firebase Storage');
      return { image: [] }; // Empty Base64 string if download fails
    }

    // Convert file buffer to Base64
    const base64Image = fileBuffer.toString('base64');
    const imageResult: ImageDTO = {
      image: base64Image,
    };
    return imageResult;
  } catch (error) {
    console.error('Error fetching image data:', error);
    throw error;
  }
}
