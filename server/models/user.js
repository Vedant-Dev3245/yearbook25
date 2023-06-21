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
        type: String,
        required: true
    },
    personalEmail: {
        type: String
    },
    phone: {
        type: String
    },
    bitsId: {
        type: String,
        required: true
    },
    nominatedby: {
        type: Array
    },
    quote: {
        type: String
    },
    branchCode: [{
        type: String,
        required: true
    }],
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
searchSchema.index({ name: "text", bitsId: "text" })//adding name as an index for searching the Search collection
var Search = mongoose.model('Search', searchSchema);

module.exports = { User, Search }
