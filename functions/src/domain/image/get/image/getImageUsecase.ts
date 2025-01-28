import { GetImageUsecaseRequest } from "./entity/GetImageUsecaseRequest";
import { GetImageUsecaseResponse } from "./entity/GetImageUsecaseResponse";
import { GetImageRepository } from '@data/image'

export const getImageUsecase = async (request: GetImageUsecaseRequest): Promise<GetImageUsecaseResponse> => {
  const result = await GetImageRepository(request.image);

  return {
    image: result.image,
  };
};
