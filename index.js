// server initial setup
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

// middle ware
app.use(cors());
app.use(express.json());

// testing server
app.get("/", (req, res) => {
  res.send("api is running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bmqqztp.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const serviceCollection = client
      .db("ReviewServices")
      .collection("Services");

    // api for homepage
    app.get("/home", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = await cursor.limit(3).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));
app.listen(port, () => {
  console.log("server is running", port);
});
