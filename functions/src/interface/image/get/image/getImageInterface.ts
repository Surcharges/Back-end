import express from "express";
import { getImageUsecase } from "@domain/image";
import { Response } from "./model/GetImageInterfaceResponse";

export const getImageInterface = async (request: express.Request, response: Response) => {
  const image = (request.query.image as string) || undefined;

  if (!image) {
    response.status(400).send({ message: "Missing image name" });
    return;
  }

  try {
    const result = await getImageUsecase({ image: image });
    // console.log("getImageInterface result: ", result.image)

    response.status(200).send({
      image: result.image,
    });
  } catch (error) {
    console.error("Error fetching image data:", error);
    response.status(500).send({ message: "Internal server error" });
  }
};
