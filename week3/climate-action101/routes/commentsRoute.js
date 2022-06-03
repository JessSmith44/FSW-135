const express = require('express')
const commentRoute = express.Router()
const Comments = require('../models/comments')

commentRoute.get('/', (req, res, next) => {
    Comments.find((err, allcomments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(allcomments)
    })
})

commentRoute.get('/:commentId', (req, res, next) => {
    const commentId = req.params.commentId
    Comments.findOne(
        {_id: commentId},
        (err, foundComment) => {
            if(err){
                const err = new Error(`The comment you are looking for was not found`)
                return next(error)
            }
            return res.status(200).send(foundComment)
        }
    )
})

commentRoute.post('/', (req, res, next) => {
    const newComment = new Comments(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

commentRoute.put('/:commentId', (req, res, next) => {
    Comments.findByIdAndUpdate(
        {_id: req.params.commentId},
        req.body,
        {new: true},
        (err, updatedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        }
    )
})

commentRoute.delete('/:commentId', (req, res, next) => {
    Comments.findOneAndDelete(
        {_id: req.params.commentId},
        (err, deleteComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted comment ${deleteComment.title}`)
        }
    )
})