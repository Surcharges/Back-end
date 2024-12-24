import express from "express";
import { getSurchargeUsecase } from "@domain/surcharge"

export const getSurchargeInterface = async (req: express.Request, res: express.Response) => {

  try {
    const placeId  = req.query.placeId as string
    if (!placeId) {
      res.status(400).send({ message: "placeId is required" });
      return;
    }
    const surcharge = await getSurchargeUsecase({ id: placeId })
    res.status(200).send(surcharge);
  } catch (error) {
    console.log("Error in getSurchargeInterface:", error);
    res.status(500).send(error);
    return
  }

};
