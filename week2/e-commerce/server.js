const express = require('express');
const app = express();
const morgan = require('morgan');

const inventoryRouter = require('./routes/inventory')

app.use(express.json());
app.use(morgan('dev'));

const mongoose = require('mongoose');
const { Db } = require('mongodb');
mongoose.connect('mongodb://localhost:27017/inventorydb'),
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},
    () => console.log("connected to the DB")

app.use("/inventory", inventoryRouter)

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})
      
app.listen(9000, () => {
    console.log("The server is running on Port 9000, say hello")
})
