// server initial setup
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

// middle ware
app.use(cors());
app.use(express.json());
