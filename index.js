// server initial setup
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

// middle ware
app.use(cors());
app.use(express.json());

// testing server
app.get("/", (req, res) => {
  res.send("api is running");
});

app.listen(port, () => {
  console.log("server is running", port);
});
