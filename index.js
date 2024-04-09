const express = require('express')
const app = express();
const router = require('./routes/customerRoute');
const logger = require('morgan');
require('dotenv').config()
let port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))

app.use('/api/v1', router);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})