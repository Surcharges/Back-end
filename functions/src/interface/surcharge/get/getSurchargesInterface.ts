import { getSurchargesUsecase } from "@domain/surcharge"
import { Response } from "./model/GetSurchargesInterfaceResponse"

export const getSurchargesInterface = async (res: Response) => {
  try {
    console.log("Response object:", res.status);
    const surcharges = await getSurchargesUsecase();
    res.status(200).send(
      surcharges.map((surcharge) => ({
        placeInformation: surcharge.placeInformation,
        rate: surcharge.rate,
        reportedDate: surcharge.reportedDate,
        totalAmount: surcharge.totalAmount,
        surchargeAmount: surcharge.surchargeAmount,
        surchargeStatus: surcharge.surchargeStatus
      }))
    );
  } catch (error) {
    console.error("Error in getSurchargeInterface:", error);
    res.status(500).send({error});
  }

};