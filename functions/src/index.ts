require('module-alias/register')

import { onRequest } from "firebase-functions/v2/https";
import express from "express";

import { places, place } from "@interface/place";

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

exports.api = onRequest(api)