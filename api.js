const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const port = 5500;

const uri =
  "mongodb://user:pass321@mongodb:27017";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

app.get("/", async (req, res) => {
  res.json({
    msg: "Backend is Running",
    availableMethods: {
      "/addContributor?name=####": "Adds contributor to the database",
      "/allContributors": "Get data about all contributors",
    },
  });
});

// adds a contributor
app.get("/addContributor", async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    const db = client.db("photons");
    const contribs = db.collection("contributors");
    const result = await contribs.insertOne({ name: req.query.name });
    res.json(result);
  } catch (e) {
    res.json({ msg: "error occured", err: e.msg });
  } finally {
    await client.close();
  }
});

// gets all contributors
app.get("/allContributors", async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    const db = client.db("photons");
    const contribs = db.collection("contributors");
    const ans = await contribs.find().toArray();
    //const ansNames = ans.map((obj) => obj.name);
    res.json({ status: 200, ans });
  } catch (e) {
    res.json({ msg: "error occured", err: e.msg });
  } finally {
    await client.close();
  }
});

// adds a funding
app.get("/addFunding", async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    const db = client.db("photons");
    const funding = db.collection("fundings");
    await funding.insertOne({
      name: req.query.name,
      amount: req.query.amount,
      fundId: req.query.fundId,
    });
    res.send({ status: 200 });
  } catch (e) {
    res.send({ msg: "error occured", err: e.msg });
  } finally {
    await client.close();
  }
});

// gets all fundings
app.get("/allFundings", async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    const db = client.db("photons");
    const fundings = db.collection("fundings");
    const ans = await fundings.find().toArray();
    res.send({ status: 200, ans: ans });
  } catch (e) {
    res.send({ msg: "error occured", err: e.msg });
  } finally {
    await client.close();
  }
});

// deletes a funding
app.get("/deleteFunding", async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    const db = client.db("photons");
    const fundings = db.collection("fundings");
    const ans = await fundings.deleteOne({
      fundId: req.query.fundId,
    });
    res.send({ status: 200, deletedCount: ans.deletedCount });
  } catch (e) {
    res.send({ msg: "error occured", err: e.msg });
  } finally {
    await client.close();
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend is listening on port ${port}`);
});
