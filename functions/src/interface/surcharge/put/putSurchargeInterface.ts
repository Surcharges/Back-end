import { PutSurchargeInterfaceRequest } from "@interface/surcharge"
import { Request, Response } from "express";
import { putSurchargeUsecase } from "@domain/surcharge"

export const putSurchargeInterface = async (req: Request, res: Response): Promise<void> => {
  try {
    let { id, surchargeAmount, totalAmount, action } = req.body;
    const surcharge: PutSurchargeInterfaceRequest = {
      id: id,
      surchargeAmount: surchargeAmount,
      totalAmount: totalAmount,
      action: action,
    };
    await putSurchargeUsecase(surcharge);
    res.status(200).send({ message: "Surcharge successfully confirmed." });
  } catch (error) {
    console.error("Error in putSurchargeInterface:", error);
    res.status(500).send({ message: "An error occurred while verifying the surcharge." });
  }
};
