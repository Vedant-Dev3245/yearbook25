const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(process.env.POSTGRES_DATABASE_URL);

const User = sequelize.define(
    'User', 
    {
        user_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        name:{
            type: DataTypes.STRING,
            allowNull: false
        },

        imageUrl:{
            type: DataTypes.STRING
        },

        email:{
            type: DataTypes.STRING,
            allowNull: false
        },

        personalEmail:{
            type: DataTypes.STRING
        },

        phone:{
            type: DataTypes.STRING
        },

        bitsId: {
            type: DataTypes.STRING,
            allowNull: false
        },

        nominatedby: { // the user is nominated by who
            type: DataTypes.ARRAY(DataTypes.STRING)
        },

        quote: {
            type: DataTypes.STRING
        },

        branchCode: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },

        commitments:{
            type: DataTypes.ARRAY(DataTypes.UUID)
        },

        requests: {
            type: DataTypes.ARRAY(DataTypes.JSON)
            // requests JSON has the structure {writerID, caption}
        },

        declined_requests: {
            type: DataTypes.ARRAY(DataTypes.JSON)
            // declined_requests JSON has the structure {writerID, caption}
        },

        captions: {
            type: DataTypes.ARRAY(DataTypes.JSON)
            // captions JSON has the structure {writerID, caption}
        }
    }
);

// IMPLEMENT THE BELOW CODE IN SEQUELIZE - SEARCHING FOR USERS THROUGH THEIR NAME OR ID:
// This code block is basically telling MongoDB to search for records based on uID, name to make searches faster
// Do we even require such a thing for PostgreSQL?
// // UserSchema.index({name: 'text'})
// var User = mongoose.model('User', UserSchema);

// const searchSchema = new mongoose.Schema({
//     uId: String,
//     name: String,
//     bitsId: String
// });
// searchSchema.index({ name: "text", bitsId: "text" })//adding name as an index for searching the Search collection
// var Search = mongoose.model('Search', searchSchema);

// module.exports = { User, Search }

module.exports = {User};
