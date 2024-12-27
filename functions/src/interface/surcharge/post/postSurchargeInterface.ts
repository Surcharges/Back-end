import express from "express";
import { postSurchargeUsecase } from "@domain/surcharge"
import { Response } from "express";
import { PostSurchargeInterfaceRequest } from "./models/PostSurchargeInterfaceRequest";
import { PostSurchargeUsecaseRequest } from "@domain/surcharge";

interface CustomRequest extends express.Request {
  // body: Partial<SurchargeDTO>; // Body may not have all properties yet
  body: PostSurchargeInterfaceRequest
}

export const postSurchargeInterface = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    // Extract and validate required fields
    const { id, picture, rate, totalAmount, surchargeAmount } = req.body;

    // if (!id || !placeInformation || rate === undefined || !reportedDate) {
    //     res.status(400).send({ message: "Missing required fields in request body." });
    //     return;
    // }

    // Map the incoming data to SurchargeDTO
    const surcharge: PostSurchargeUsecaseRequest = {
      id,
      picture,
      rate,
      totalAmount,
      surchargeAmount,
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
