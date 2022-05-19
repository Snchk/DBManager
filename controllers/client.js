const Client = require("../models/Client");
const errorHandler = require("../utils/errorHandler");

module.exports.create = async function(req, res) {

    try {
        const client = await new Client({
        acqid:req.body.acqid,
        name: req.body.name,
        caid:req.body.caid,
        description:req.body.description
    }).save()
        res.status(201).json(client)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res) {
    try {
        const client = await Client.findById(req.params.id)
        res.status(200).json(client)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getAll = async function(req, res) {
    try {
        const clients = await Client.find(/*{user: req.user.id}*/)
        res.status(200).json(clients)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        const client = await Client.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true})
        res.status(200).json(client)
    } catch (e) {
        errorHandler(res, e)
    }
}
    module.exports.remove = async function (req, res) {
        try {
            await Client.findByIdAndRemove({_id: req.params.id})

            res.status(200).json({message: 'Удалено'})
        } catch (e) {
            errorHandler(res, e)
        }
    }
