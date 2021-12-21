const Sequelize = require('sequelize');
const sequelize = require('../db/db.js');
module.exports = sequelize.define('inventory',{
    inventory_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true

    },
    inventory_shipping_date: {
        type: Sequelize.STRING(100)
    },
    inventory_productname: {
        type: Sequelize.STRING(100)
    },
    inventory_sku: {
        type: Sequelize.STRING(100)
    },
    inventory_qtyorderd: {
        type: Sequelize.INTEGER(20)
    },

    inventory_damages: {
        type: Sequelize.INTEGER(11)
    },
    inventory_user_id: {
        type:Sequelize.INTEGER(11)
    }

})