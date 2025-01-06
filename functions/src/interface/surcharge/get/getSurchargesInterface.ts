import { getSurchargesUsecase } from "@domain/surcharge"
import { Response } from "express";

export const getSurchargesInterface = async (res: Response): Promise<void> => {
  try {
      const surcharges = await getSurchargesUsecase()
      res.status(200).send(
        surcharges.map((surcharge) => ({
            placeInformation: surcharge.placeInformation,
            rate: surcharge.rate,
            reportedDate: surcharge.reportedDate,
            totalAmount: surcharge.totalAmount,
            surchargeAmount: surcharge.surchargeAmount,
            surchargeStatus: surcharge.surchargeStatus
        }))
      )
    } catch (error) {
      console.log("Error in getSurchargeInterface:", error);
      res.status(500).send(error);
      return
    }
};