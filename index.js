// server initial setup
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    const reviewCollection = client.db("ReviewServices").collection("Review");

    // api for homepage
    app.get("/home", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = await cursor.limit(3).toArray();
      res.send(result);
    });

    // api for all services
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // api for service details for individual service
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      console.log(service);
      res.send(service);
    });

    // api for adding users info and review in db
    app.post("/reviews", async (req, res) => {
      const user = req.body;
      const result = await reviewCollection.insertOne(user);
      res.send(result);
    });

    // api for getting review in client side
    app.get("/reviews", async (req, res) => {
      let query = {};
      const search = req.query.service;
      if (search) {
        query = { service: search };
      }
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });

    // api for getting individula user's review
    app.get("/review", async (req, res) => {
      let query = {};

      if (req.query.email) {
        query = { email: req.query.email };
      }
      const cursor = reviewCollection.find(query);
      const userReview = await cursor.toArray();
      res.send(userReview);
    });

    // api for deleting review
    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: ObjectId(id),
      };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });
    // api for adding services
    app.post("/addservice", async (req, res) => {
      const query = req.body;
      const addedService = await serviceCollection.insertOne(query);
      res.send(addedService);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));
app.listen(port, () => {
  console.log("server is running", port);
});
