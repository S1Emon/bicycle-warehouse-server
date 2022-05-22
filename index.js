const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config();

// middle ware
app.use(cors());
app.use(express.json());

// BlxTvbZ7ID28SRO7


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z1z7z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {

    await client.connect()
    console.log('db connected');
    const productCollection = client.db("bicycleWarehouse").collection("products")
    try {
        // Get data
        app.get('/products', async (req, res) => {
            const query = req.query;
            const result = await productCollection.find(query).toArray()
            res.send(result);
        })

        // Create data


        //Update Data


        //Delete Data



    }
    finally {
        // client.close
    }

}
run().catch(console.dir);


client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});




app.listen(port, () => {
    console.log('Server is running');
})