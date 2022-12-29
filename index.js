const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        app.get('/allTask', async(req, res) => {
            const task = req.query.task;
            const query = {task: task};
            const alltasks = await alltask.find(query).toArray();
            res.send(alltasks);
        })
        app.get('/allTask', async(req, res) => {
            const email = req.query.email;
            const query = {email: email};
            const alltasks = await alltask.find(query).toArray();
            res.send(alltasks);
        })
        app.get('/allTask/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await alltask.find(query).toArray();
            res.send(service);
        })

        app.put('/allTask/:id', async(req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    complete: true
                }
            }
            const result = await alltask.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        app.delete('/allTask/:id', async(req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const result = await alltask.deleteOne(filter);
            res.send(result)
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