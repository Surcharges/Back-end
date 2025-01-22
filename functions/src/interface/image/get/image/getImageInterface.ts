import express from "express";
import { getImageUsecase } from "@domain/image";
import { Response } from "./model/GetImageInterfaceResponse";

export const getImageInterface = async (request: express.Request, response: Response) => {
  const image = (request.body.image as string) || undefined;

  if (!image) {
    response.status(400).send({ message: "Missing image name" });
    return;
  }

  try {
    const result = await getImageUsecase({ image: image });
    console.log(result)

    response.status(200).send({
      image: result.image,
    });
  } catch (error) {
    console.error("Error fetching place data:", error);
    response.status(500).send({ message: "Internal server error" });
  }
};
