const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    name : {
        type: String,
     uppercase: true
    },
    imageUrl : {
        type : String
    },
    email : {

    },
    bitsId : {

    },
    nominatedby : {
        type : Array
    },
    quote: {

    },
    discipline : {

    },
    captions : {
        type : Array
    },
    img: 
    { 
        type : Buffer
    } 
})

    
// UserSchema.index({name: 'text'})
var User = mongoose.model('User', UserSchema);

const searchSchema = new mongoose.Schema({
    uId: String,
    name: String,
    bitsId: String
});
searchSchema.index({name: 'text'})
var Search = mongoose.model('Search', searchSchema);

module.exports = {User,Search}
