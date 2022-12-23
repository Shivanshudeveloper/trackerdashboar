'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productivity_settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  productivity_settings.init({
    organization: DataTypes.STRING,
    team: DataTypes.STRING,
    owner: DataTypes.STRING,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'productivity_settings',
  });
  return productivity_settings;
};