const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
const { send } = require('express/lib/response');
const port = process.env.PORT || 5000;
require('dotenv').config();
// const jwt = require('jsonwebtoken');

// middle-ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z1z7z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {

    await client.connect()
    console.log('db connected');
    const productCollection = client.db("bicycleWarehouse").collection("products")
    const serviceCollection = client.db("bicycleWarehouse").collection("services")
    const mostSellCollection = client.db("bicycleWarehouse").collection("mostSell")
    try {
        // Get data
        app.get('/products', async (req, res) => {
            const query = req.query;
            const result = await productCollection.find(query).toArray()
            res.send(result);
        })

        app.get('/services', async (req, res) => {
            const query = req.query;
            const result = await serviceCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/mostsell', async (req, res) => {
            const query = req.query;
            const result = await mostSellCollection.find(query).toArray();
            res.send(result);
        })
        // single data load
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const product = await productCollection.findOne(query)
            res.send(product);
        })

        // Create data
        app.post('/product', async (req, res) => {
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        })

        //Update Data
        app.put('/product/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) }
            const option = { upsert: true }
            const updateDoc = {
                $set: {
                    ...data
                },
            }
            const result = await productCollection.updateOne(filter, option, updateDoc);
            res.send(result);
        })


        //Delete Data
        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await productCollection.deleteOne(filter);
            res.send(result);
        })


    }
    finally {
        // client.close
    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Server is on")
})

app.listen(port, () => {
    console.log('Server is running');
})