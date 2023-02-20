const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
var bodyParser = require('body-parser')
dotenv.config();

const UserRouter = require('./src/router/userRouter');
const AuthRouter = require('./src/router/auth');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Banco de dados conectado com sucesso')
}).catch((err)=>{
    console.log(err);
});


app.use('/api/user', UserRouter);
app.use('/api/auth', AuthRouter);

const port = process.env.PORT

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
