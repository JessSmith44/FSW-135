const express = require('express');
const issueRouter = express.Router();
const Issues = require('../models/issue.js');
const uuid = require('uuidv4');

issueRouter.get('/', (req, res, next) => {
    console.log('Hello')
    Issues.find((err, allIssues) => {
        console.log(allIssues)
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(allIssues)
    })
})

issueRouter.get('/user', (req, res, next) => {
    console.log(req.body, "req body")
    console.log(req.body._id)
    Issues.find({ user: req.auth._id }, (err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

issueRouter.get('/:issueId', (req, res, next) => {
    const issueId = req.params.issueId
    Issues.findOne(
        {_id: issueRouter},
        (err, foundIssue) => {
            if(err){
                const error = new Error(`The issue you are looking for cannot be found`)
                return next(error)
            }
            return res.status(200).send(foundIssue)
        }
    )
})

issueRouter.post('/', (req, res, next) => {
    // console.log(req.body)
    // console.log(req.body._id)
    req.body.user = req.auth._id
   // console.log(req.auth._id)
    const newIssue = new Issues(req.body)
    newIssue.save((err, savedIssue) => {
        // console.log(savedIssue)
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

issueRouter.put('/:issue_id', (req, res, next) => {
    // console.log(req.body)
    // console.log(req.body._id)
    Issues.findByIdAndUpdate(
        {_id: req.auth._id},
        req.body,
        {new: true},
        (err, updateIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updateIssue)
        }
    )
})

issueRouter.delete('/:issueId', (req, res, next) => {
    Issues.findOneAndDelete(
        {_id: req.params.issueId, user: req.auth._id },
        (err, deleteIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted issue ${deleteIssue.title}`)
        }
    )
})

module.exports = issueRouter