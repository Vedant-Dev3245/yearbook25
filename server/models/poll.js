const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("postgres");

const Poll = sequelize.define(
  'Poll',
  {
    question:{
      type: DataTypes.STRING,
      allowNull: false
      // !!! define alerts for "Question Field cannot be empty" and "Question cannot exceed 300 characters"
    },

    totalCount:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    branch:{
      type: DataTypes.STRING
    },

    votes:{
      type: DataTypes.ARRAY(DataTypes.JSON)
    }
    // votes JSON has the structure: {user:userid, count:number defining number of votes the user has got, hasVoted: status of whether the user has voted}
  }
)

module.exports = {Poll};
