const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    description:{
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issue: {
        type: Schema.Types.ObjectId,
        ref: 'Issue',
        required: true
    }
})

module.exports = mongoose.model('Comments', commentSchema)