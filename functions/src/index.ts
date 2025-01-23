require('module-alias/register')

import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import { getPlaceInterface, getPlacesInterface } from "@interface/place";
import { getSurchargeInterface, postSurchargeInterface, getSurchargesInterface } from "@interface/surcharge";
import { AdminAuth } from "@shared/authentication";
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
api.post("/surcharge", postSurchargeInterface)

exports.api = onRequest(api)

// For Admin Dashboard APIs
const admin = express()

admin.use(cors(corsOptions))
admin.use(AdminAuth)
admin.get("/surcharges", getSurchargesInterface)
//admin.put("/surcharge", putSurchargeInterface)
exports.admin = onRequest(admin)

// For Mobile APIs
const mobile = express()

mobile.use(MobileAuth)

mobile.get("/place/v1", getPlaceInterface)
mobile.get("/places/v1", getPlacesInterface)
mobile.post("/surcharge/v1", postSurchargeInterface)

mobile.use((req, res) => {
  res.status(404).send()
})

exports.mobile = onRequest(mobile)