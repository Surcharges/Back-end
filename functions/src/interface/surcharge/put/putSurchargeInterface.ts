import { PutSurchargeInterfaceRequest } from "@interface/surcharge"
import { Request, Response } from "express";
import { putSurchargeUsecase } from "@domain/surcharge"

export const putSurchargeInterface = async (req: Request, res: Response): Promise<void> => {
  try {
    let { id, surchargeAmount, totalAmount } = req.body;
    const surcharge: PutSurchargeInterfaceRequest = {
      id: id,
      surchargeAmount: surchargeAmount,
      totalAmount: totalAmount
    };
    await putSurchargeUsecase(surcharge);
    res.status(200).send({ message: "Surcharge successfully verifyed." });
  } catch (error) {
    console.error("Error in putSurchargeInterface controller:", error);
    res.status(500).send({ message: "An error occurred while verifying the surcharge." });
  }
};
