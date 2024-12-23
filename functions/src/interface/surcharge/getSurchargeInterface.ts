import express from "express";

interface Response extends express.Response {

}

export const getSurcharge = async (req: express.Request, res: Response) => {
  res.status(200).send({message: "Hello from getSurcharge!"});
};
