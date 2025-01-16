import { getSurchargesUsecase } from "@domain/surcharge"
import { Response, Request } from "express";

export const getSurchargesInterface = async (req: Request, res: Response) => {
  try {
    const surcharges = await getSurchargesUsecase();
    res.status(200).send(
      surcharges.map((surcharge) => ({
        image: surcharge.image,
        placeInformation: surcharge.placeInformation,
        rate: surcharge.rate,
        reportedDate: surcharge.reportedDate,
        totalAmount: surcharge.totalAmount,
        surchargeAmount: surcharge.surchargeAmount,
        surchargeStatus: surcharge.surchargeStatus
      }))
    );
  } catch (error) {
      console.error("Error in getSurchargesInterface:", error);
      res.status(500).send({ error });
  }
};
