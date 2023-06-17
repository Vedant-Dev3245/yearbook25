const mongoose = require('mongoose')
//this file determines the user model and schema
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true
    },
    imageUrl: {
        type: String
    },
    email: {

    },
    pEmail: {

    },
    phone: {
        type: String
    },
    bitsId: {

    },
    nominatedby: {
        type: Array
    },
    quote: {

    },
    discipline: {

    },
    captions: {
        type: Array
    },
    requests: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
    declined_requests: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
})


// UserSchema.index({name: 'text'})
var User = mongoose.model('User', UserSchema);

const searchSchema = new mongoose.Schema({
    uId: String,
    name: String,
    bitsId: String
});
searchSchema.index({ name: 'text' })//adding name as an index for searching the Search collection
var Search = mongoose.model('Search', searchSchema);

module.exports = { User, Search }
