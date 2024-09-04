const {Sequelize, DataTypes} = require("sequelize");
const { postgresClient } = require("../db/postgres");


const User = postgresClient.define(
    'user', 
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

        nominatedby: { // JSON: {name, id}
            type: DataTypes.ARRAY(DataTypes.JSON),
            defaultValue: []
        },

        quote: {
            type: DataTypes.STRING
        },

        branchCode: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },

        commitments:{
            type: DataTypes.ARRAY(DataTypes.UUID)
        },

        requests: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            defaultValue: []
            // requests JSON has the structure {user, caption}
        },

        declined_requests: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            defaultValue: []
            // declined_requests JSON has the structure {user, caption}
        },

        captions: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            defaultValue: []
            // captions JSON has the structure {user, caption}
        },

        senior: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: "alluser"
    }
);

module.exports = {User};
