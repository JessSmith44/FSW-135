const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
// const { Db } = require('mongodb')
const issuesRouter = require('./routes/issueRoute')
const authRouter = require('./routes/authRoute')
// const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var { expressjwt : jwt } = require('express-jwt')
require('dotenv').config()

app.use(express.json())
app.use(morgan('dev'))


mongoose.connect('mongodb://localhost:27017/climate-actiondb'),
    {
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('Connected to the DB')
//)

app.use('/api/', jwt({
    secret: process.env.SECRET, 
    algorithms: ['HS256'], 
}))
app.use('/auth', authRouter)
app.use('/api/issues', issuesRouter)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use((err, req, res, next) => {
    if(err.name === 'Unauthorized Error'){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.listen(9000, () => {
    console.log('Server is running on local port 9000')
})