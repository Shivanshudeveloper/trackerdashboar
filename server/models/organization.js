'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  organization.init({
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    customDomain: DataTypes.STRING,
    timezone: DataTypes.STRING,
    trackingMode: DataTypes.STRING,
    trackOn: DataTypes.DATE,
    trackBetween: DataTypes.JSON,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'organization',
  });
  return organization;
};