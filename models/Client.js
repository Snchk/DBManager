const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema= new Schema({
    acqid: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    caid: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('clients', clientSchema)