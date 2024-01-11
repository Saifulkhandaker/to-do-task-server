const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());




//mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bajp1jm.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    // to-do collection
    const taskcollection = client.db('taskcollection').collection('task');


    app.get('/task', async(req, res) => {
        const cursor = taskcollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })

    // add new task
    app.post('/task', async(req, res) => {
        const newtask = req.body;
        console.log(newtask);
        const result = await taskcollection.insertOne(newtask);
        res.send(result);
    })






    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('To-do server is running')
})
app.listen(port, () => {
    console.log(`T0-do server is running on port: ${port}`);
})
