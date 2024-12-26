import express from "express";
import { postSurchargeUsecase } from "@domain/surcharge"
import {Response} from "express";
import { SurchargeDTO } from "@data/surcharge"
import {PostSurchargeRequest} from "@domain/surcharge/entities/PostSurchargeRequest"

interface CustomRequest extends express.Request {
  // body: Partial<SurchargeDTO>; // Body may not have all properties yet
  body: SurchargeDTO
}

export const postSurchargeInterface = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
      // Extract and validate required fields
      const { id, picture, placeInformation, rate, totalAmount, surchargeAmount, purchaseAmount } = req.body;

      // if (!id || !placeInformation || rate === undefined || !reportedDate) {
      //     res.status(400).send({ message: "Missing required fields in request body." });
      //     return;
      // }

      // Map the incoming data to SurchargeDTO
      const surcharge: PostSurchargeRequest = {
          id,
          picture,
          placeInformation,
          rate,
          totalAmount,
          surchargeAmount,
          purchaseAmount,
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
