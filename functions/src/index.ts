require('module-alias/register')

import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import admin from "firebase-admin";
import { places, place } from "@interface/place";
import { getSurchargeInterface } from "@interface/surcharge"

admin.initializeApp();
export const db = admin.firestore();

const api = express();

if (process.env.NODE_ENV === 'production') {
  const cors = require('cors')

  const corsOptions = {
    origin: 'http://bonsung.me',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }

  api.use(cors(corsOptions))
}

api.get("/places", places);
api.get("/place", place);
api.get("/api/surcharge", getSurchargeInterface)

exports.api = onRequest(api)