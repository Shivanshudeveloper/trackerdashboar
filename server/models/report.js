'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  report.init(
    {
      team: DataTypes.STRING,
      organization: DataTypes.STRING,
      users: DataTypes.ARRAY(DataTypes.JSON),
      reportTitle: DataTypes.STRING,
      reportCategory: DataTypes.ARRAY(DataTypes.STRING),
      reportPeriod: DataTypes.JSON,
      sharePeriod: DataTypes.STRING,
      shareTime: DataTypes.DATE,
      shareWith: DataTypes.STRING,
      type: DataTypes.STRING,
      time: DataTypes.DATE,
      createdBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'report',
    }
  )
  return report
}
