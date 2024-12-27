require('module-alias/register')

import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import { getPlaceInterface, getPlacesInterface } from "@interface/place";
import { getSurchargeInterface, postSurchargeInterface } from "@interface/surcharge";

const api = express();

const cors = require('cors')

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

api.use(cors(corsOptions))

api.get("/places", getPlaceInterface);
api.get("/place", getPlacesInterface);
api.get("/surcharge", getSurchargeInterface)
api.post("/surcharge", postSurchargeInterface)

exports.api = onRequest(api)