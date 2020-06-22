module.exports = (app) => {
    const user = require('../controllers/user')

    // list all users
    app.get('/users', user.listAll)

    // create new user
    app.post('/users/create', user.create)

    // find user with mail
    app.post('/users/find', user.findWithEmail)

    // update user with mail
    app.put('/users/update', user.update)
}