import { customRequest } from "./customRequest/customRequest"
import { postSurchargeUsecase } from "@domain/surcharge"
import { Response } from "express";
import { PostSurchargeUsecaseRequest } from "@domain/surcharge"

export const postSurchargeInterface = async (req: customRequest, res: Response): Promise<void> => {
  try {

    let { place, image, rate, totalAmount, surchargeAmount } = req.body;

    let isRate = false;
    if(rate === undefined){isRate = false} else isRate = true
    let isAmount = false;
    if(totalAmount === undefined ||
      surchargeAmount === undefined){isAmount = false} else isAmount = true
    if(!isRate && !isAmount){
      throw new Error("Insufficient parameters provided for rate calculation.")
    }


    // Map the incoming data to PostSurchargeUsecaseRequest
    const surcharge: PostSurchargeUsecaseRequest = {
      place: place,
      image: image,
      rate: rate,
      totalAmount: totalAmount,
      surchargeAmount: surchargeAmount
    };

    // Call the use case
    await postSurchargeUsecase(surcharge);

    // Respond with success
    res.status(200).send({ message: "Surcharge successfully posted." });
  } catch (error) {
    console.error("Error in postSurcharge controller:", error);
    res.status(500).send({ message: "An error occurred while posting the surcharge." });
  }
};
