const {Sequelize} = require("sequelize");

function connectPostgres(){
    const sequelize = new Sequelize(process.env.POSTGRES_DATABASE_URL);
    try{
        sequelize.authenticate();
        console.log("Connection has been established succesfully");
        return sequelize;
    }catch(err){
        console.log("Unable to connect to the database", err);
    }
};

module.exports = {connectPostgres};