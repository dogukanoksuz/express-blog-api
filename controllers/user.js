// divergent
// user controller

const User = require('../models/user')

// list all users
exports.listAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users)
        })
        .catch(e => {
            res.status(500).send(err.message.json())
        })
}

// create new user
exports.create = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: `Data is empty`
        })
    }

    const user = new User({
        name: req.body.name || `No Swear`,
        email: req.body.email,
        password: req.body.password
    })

    user.save()
        .then(data => {
            res.send(data)
        })
        .catch(e => {
            res.status(500).send(err.message.json())
        })
}

exports.findWithEmail = (req, res) => {
    if (!req.query.email) {
        return res.status(400).send({
            message: `Data is empty`
        })
    }

    User.find({
        email: req.query.email
    })
        .then(data => {
            res.send(data)
        })
        .catch(e => {
            res.status(500).send(err.message.json())
        })
}

exports.update = (req, res) => {
    if (!req.body.email) {
        return res.status(400).send({
            message: `Data is empty`
        })
    }

    const user = User.find({
        email: req.body.email
    })

    if (req.body.password) {
        user.update({
            name: req.body.name || user.name,
            password: req.body.password
        }, {new: true})
            .then(data => {
                res.send(data)
            })
            .catch(e => {
                res.status(500).send(err.message.json())
            })
    } else {
        user.update({
            name: req.body.name,
        }, {new: true})
            .then(data => {
                res.send(data)
            })
            .catch(e => {
                res.status(500).send(err.message.json())
            })
    }
}