'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class app_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  app_type.init({
    appName: DataTypes.STRING,
    appType: DataTypes.STRING,
    organization: DataTypes.STRING,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'app_type',
  });
  return app_type;
};