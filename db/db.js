const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamp: false,
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

// try{
//     await sequelize.authenticate();
//     console.log("db connected");
// }
// catch(error){
//     console.log("db not connected");
// }



module.exports = { conn: sequelize.connectionManager.getConnection() };
