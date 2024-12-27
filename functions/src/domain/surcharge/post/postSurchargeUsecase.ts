import { PostSurchargeRepo } from "@data/surcharge";
import { PostSurchargeUsecaseRequest } from "./entity/PostSurchargeUsecaseRequest";
import { PostSurchargeRepositoryRequest } from "@data/surcharge";

export const postSurchargeUsecase = async (request: PostSurchargeUsecaseRequest): Promise<void> => {
  try {
      // Map the Request object to PostSurchargeRepositoryRequest
      const surcharge: PostSurchargeRepositoryRequest = {
          id: request.id,
          picture: request.picture,
          rate: request.rate,
          totalAmount: request.totalAmount,
          surchargeAmount: request.surchargeAmount
      };

      // Call the repository function
      return await PostSurchargeRepo(surcharge)
  } catch (error) {
      console.error("Error in use case:", error);
      throw error;
  }
};