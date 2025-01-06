import express from "express";
import { getPlaceUsecase } from "@domain/place";
import { Response } from "./model/GetPlaceInterfaceResponse";

export const getPlaceInterface = async (request: express.Request, response: Response) => {
  const placeId = (request.query.id as string) || undefined;

  if (!placeId) {
    response.status(400).send({ message: "Missing placeId" });
    return;
  }

  try {
    const result = await getPlaceUsecase({ id: placeId });

    response.status(200).send({
      id: result.id,
      displayName: {
        text: result.displayName.text,
        languageCode: result.displayName.languageCode,
      },
      addressComponents: result.addressComponents.map((component) => ({
        longText: component.longText,
        shortText: component.shortText,
        types: component.types,
        languageCode: component.languageCode,
      })),
      location: result.location
        ? {
            latitude: result.location.latitude,
            longitude: result.location.longitude,
          }
        : undefined,
      rate: result.rate ?? null, // Include the rate field
      reportedDate: result.reportedDate ?? null, // Include the reportedDate field
      surchargeStatus: result.surchargeStatus
    });
  } catch (error) {
    console.error("Error fetching place data:", error);
    response.status(500).send({ message: "Internal server error" });
  }
};
