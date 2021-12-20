const Sequelize = require('sequelize');
const sequelize = require('../db/db.js');
module.exports = sequelize.define('users',{
    user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true

    },
    user_name: {
        type: Sequelize.STRING(255)
    },
    user_email: {
        type: Sequelize.STRING(255)
    },
    user_password: {
        type: Sequelize.STRING(255)
    },
    user_phonenumber: {
        type: Sequelize.STRING(255)
    }
    
})