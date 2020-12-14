'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Reserves.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    date: DataTypes.STRING,
    entryTime: DataTypes.INTEGER,
    isDelete: DataTypes.BOOLEAN,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reserves',
  });
  return Reserves;
};