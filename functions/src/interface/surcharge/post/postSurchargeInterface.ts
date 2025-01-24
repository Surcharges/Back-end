import { PostSurchargeInterfaceRequest } from "./models/PostSurchargeInterfaceRequest"
import {
  PostSurchargeInterfaceResponse,
  PostSurchargeInterfaceResponseData
} from "./models/PostSurchargeInterfaceResponse"
import { postSurchargeUsecase } from "@domain/surcharge"
import { PostSurchargeUsecaseRequest } from "@domain/surcharge"

export const postSurchargeInterface = async (
  request: PostSurchargeInterfaceRequest, 
  response: PostSurchargeInterfaceResponse<PostSurchargeInterfaceResponseData>
) => {

  try {

    let { placeId, image, totalAmount, surchargeAmount } = request.body
    // Check if the required parameters are provided. If not, return bad request.

    const isValidRequestBody = placeId !== undefined && image !== undefined && totalAmount !== undefined && surchargeAmount !== undefined

    if (!isValidRequestBody) {
      response.status(400).send()
      return
    }

    // Check if the total amount and surcharge amount are not negative
    if (totalAmount < 0 || surchargeAmount < 0) {
      response.status(400).send()
      return
    }

    // Map the incoming data to PostSurchargeUsecaseRequest
    const surcharge: PostSurchargeUsecaseRequest = {
      placeId: placeId,
      image: image,
      totalAmount: totalAmount,
      surchargeAmount: surchargeAmount
    }

    // Call the use case
    const postSurchargeResult = await postSurchargeUsecase(surcharge)

    // Respond with success
    response.status(201).send({
      place: postSurchargeResult.place,
      surcharge: postSurchargeResult.surcharge
    })

  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
}
