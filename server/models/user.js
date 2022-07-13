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

    
UserSchema.index({name: 'text'})
var User = mongoose.model('User', UserSchema);
module.exports = User;
