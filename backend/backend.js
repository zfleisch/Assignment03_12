var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

const { MongoClient } = require("mongodb");
//MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);


app.get("/FakeStoreCatalog", async (req, res) => {
    
    await client.connect();

    console.log("Node successfully connected to GET Mongodb");

    const query = {};

    const results = await db
        .collection("fakestore_catalog")
        .find(query)
        .limit(100)
        .toArray();

    console.log(results);
    res.status(200);
    res.send(results);
});

app.get("/FakeStoreCatalog/:id", async (req, res) => {
    const storeid = Number(req.params.id);
    console.log("Item to find :", storeid);

    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {"id": storeid};

    const results = await db.collection("fakestore_catalog")
    .findOne(query);

    console.log("Results :", results);
    if(!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

app.post("/FakeStoreCatalog", async (req, res) => {
    try
    {
        await client.connect();
        const newDocument = {
            "id": req.body.id,
            "title": req.body.title,
            "price": req.body.price,
            "description": req.body.description,
            "category": req.body.category,
            "image": req.body.image,
            "rating": {
                "rate":req.body.rating.rate,
                "count":req.body.rating.count
            }
            };
            /**
             * "id": 1,
    "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
    "price": 10.99,
    "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
        "rate": 1.9,
        "count": 100
    }
             */

        console.log(newDocument);

        const results = await db
        .collection("fakestore_catalog")
        .insertOne(newDocument);

        res.status(200);
        res.send(results);
    }
    catch (error)
    {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});

app.delete("/FakeStoreCatalog/:id", async (req, res) => {
    try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Store item to delete :",id);
    const query = { "id": id };
    // delete
    const robotDeleted = await db.collection("robot").deleteOne(query);
    res.status(200);
    res.send(robotDeleted);
    }
    catch (error){
    console.error("Error deleting robot:", error);
    res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.put("/FakeStoreCatalog/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { "id": id };
    await client.connect();
    console.log("Store item to Update :",id);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {
        $set:{
        "name": req.body.name,
        "price": req.body.price,
        "description": req.body.description,
        "imageUrl": req.body.imageUrl
        }
    };
    // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
    const options = { };
    const results = await db.collection("robot").updateOne(query, updateData, options);
    // If no document was found to update, you can choose to handle it by sending a 404 response
    if (results.matchedCount === 0) {
        return res.status(404).send({ message: 'Store item not found' });
    }
    res.status(200);
    res.send(results);
    });

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
})
