const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();


mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Banco de dados conectado com sucesso')
}).catch((err)=>{
    console.log(err);
});

const port = process.env.PORT

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))