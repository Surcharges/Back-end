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
    const place = await getPlaceUsecase({ id: placeId });

    response.status(200).send({
      id: place.id,
      displayName: {
        text: place.displayName.text,
        languageCode: place.displayName.languageCode,
      },
      addressComponents: place.addressComponents.map((component) => ({
        longText: component.longText,
        shortText: component.shortText,
        types: component.types,
        languageCode: component.languageCode,
      })),
      location: place.location
        ? {
            latitude: place.location.latitude,
            longitude: place.location.longitude,
          }
        : undefined,
      rate: place.rate ?? null, // Include the rate field
      reportedDate: place.reportedDate ?? null, // Include the reportedDate field
    });
  } catch (error) {
    console.error("Error fetching place data:", error);
    response.status(500).send({ message: "Internal server error" });
  }
};
