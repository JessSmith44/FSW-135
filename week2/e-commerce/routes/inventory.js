const express = require('express');
const inventoryRouter = express.Router();
const uuid = require('uuid');
const Inventory = require('../models/Inventory.js');
const newId = uuid.v4()


inventoryRouter.get("/", (req, res, next) => {
    Inventory.find((err, invenItems) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(invenItems)
    })
})

inventoryRouter.post("/", (req,res, next) => {
    const newInvenItem = new Inventory(req.body)
    newInvenItem.save((err, savedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedItem)
    })
})

inventoryRouter.get("/:itemId", (req, res, next) => {
    const itemId = req.params.itemId
    Inventory.findOne(
        { _id: itemId},
        (err, foundItem) => {
            if(err){
                const error = new Error(`The item with id ${itemId} was not found.`)
                return next(error)
            }
            return res.status(200).send(foundItem)
    })
})

inventoryRouter.delete("/:itemId", (req, res, next) => {
    Inventory.findOneAndDelete(
        {_id: req.params.itemId},
        (err, deleteItem) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted item ${deleteItem.item}`)
        }
    )
})

inventoryRouter.put("/:itemId", (req, res, next) => {
    Inventory.findByIdAndUpdate(
        {_id: req.params.itemId},
        req.body,
        {new: true},
        (err, updatedItem) =>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedItem)
        }
    )
})

module.exports = inventoryRouter