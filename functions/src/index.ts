require('module-alias/register')

import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import { getPlaceInterface, getPlacesInterface } from "@interface/place";
import { getSurchargeInterface, postSurchargeInterface, getSurchargesInterface } from "@interface/surcharge";
import { MobileAuth } from "@shared/authentication";

const cors = require('cors')

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

// For Web App APIs
const api = express();

api.use(cors(corsOptions))

api.get("/place", getPlaceInterface);
api.get("/places", getPlacesInterface);
api.get("/surcharge", getSurchargeInterface)
api.get("/surcharges", getSurchargesInterface)
api.post("/surcharge", postSurchargeInterface)

exports.api = onRequest(api)

// For Mobile APIs
const mobile = express()

mobile.use(MobileAuth)

mobile.get("/place", getPlaceInterface);
mobile.get("/places", getPlacesInterface);
mobile.get("/surcharge", getSurchargeInterface)
mobile.post("/surcharge", postSurchargeInterface)

exports.mobile = onRequest(mobile)