const express = require('express');
const publicRouter = express.Router();
const Issues = require('../models/issue.js');

publicRouter.get('/', (req, res, next) => {
    Issues.find((err, allIssues) => {
        console.log(allIssues)
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(allIssues)
    })
})

module.exports = publicRouter