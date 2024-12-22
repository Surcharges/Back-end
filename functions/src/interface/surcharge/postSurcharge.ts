import express from "express";
import {Response} from "express";

type EntryType = {
  title: string,
  text: string,
  coverImageUrl: string
};

interface Request extends express.Request {
  body: EntryType,
  params: { entryId: string }
}

export const postSurcharge = async (req: Request, res: Response) => {
  res.status(200).send({
    title: "title",
  });
};
