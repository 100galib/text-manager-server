const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w7wfspi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async() => {
    try{
        const alltask = client.db('task-collection').collection('allCollection');

        app.post('/allTask', async(req, res) => {
            const tasks = req.body;
            const alltaskinsert = await alltask.insertOne(tasks);
            res.send(alltaskinsert);
        })

    }
    finally {

    }
}
run().catch(error => console.log(error))



app.get('/', (req, res) => {
    res.send('backend portal is running.....')
})

app.listen(port, () => {
    console.log(`backen server is ${port}`)
})