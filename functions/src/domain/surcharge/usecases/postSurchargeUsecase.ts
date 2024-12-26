// import { Request } from "../entities/Request"
import { PostSurchargeRepo, SurchargeDTO } from "@data/surcharge"
import { PostSurchargeResponse } from '../entities/PostSurchargesResponse'

export const postSurchargeUsecase = async (request: SurchargeDTO): Promise<PostSurchargeResponse> => {
  try {
      // Map the Request object to SurchargeDTO
      const surcharge: SurchargeDTO = {
          id: request.id,
          picture: request.picture,
          placeInformation: request.placeInformation,
          rate: request.rate,
          reportedDate: request.reportedDate,
          totalAmount: request.totalAmount,
          surchargeAmount: request.surchargeAmount,
          purchaseAmount: request.purchaseAmount,
      };

      // Call the repository function
      await PostSurchargeRepo(surcharge);

      return {
        
      }
  } catch (error) {
      console.error("Error in use case:", error);
      throw error;
  }
};