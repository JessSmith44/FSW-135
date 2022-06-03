const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { Db } = require('mongodb')
const issuesRouter = require('./routes/issueRoute')
const userRouter = require('./routes/userRoute')
// const jwt = require('jsonwebtoken')
// const expressJwt = require('express-jwt')

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

app.use('/users', userRouter)
app.use('/issues', issuesRouter)
// app.use('/api', expressJwt({secret: process.env.SECRET}))

app.use((err, req, res, next) => {
    // console.log(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.listen(9000, () => {
    console.log('Server is running on local port 9000')
})