const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const UserRouter = require('./src/router/userRouter');


mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Banco de dados conectado com sucesso')
}).catch((err)=>{
    console.log(err);
});


app.use('/api/user', UserRouter);

const port = process.env.PORT

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))