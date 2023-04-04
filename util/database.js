const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "2232824aZ", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
