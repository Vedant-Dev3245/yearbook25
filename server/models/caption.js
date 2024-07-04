const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("postgres");

const caption = sequelize.define(
    'caption',
    {
        caption_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        writer_id:{
            type: DataTypes.UUID,
            allowNull: false
        },

        receiver_id:{
            type: DataTypes.UUID,
            allowNull: false
        },

        message:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

module.exports = {caption};