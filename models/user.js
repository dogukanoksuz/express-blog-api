// divergent
// user model schema

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: `No Swear`
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

UserSchema.pre('save', async function save (next) {
    if(!this.isModified('password')) return next;
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch (e) {
        return next(err)
    }
})

module.exports = mongoose.model('User', UserSchema)