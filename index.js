const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()


app.use(cors());
app.use(express.json());



const run = async() => {
    try{

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