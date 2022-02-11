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
      reportTitle: DataTypes.STRING,
      reportCategory: DataTypes.STRING,
      reportPeriod: DataTypes.JSON,
      sharePeriod: DataTypes.STRING,
      shareTime: DataTypes.DATE,
      shareWith: DataTypes.STRING,
      team: DataTypes.STRING,
      users: DataTypes.ARRAY(DataTypes.STRING),
      type: DataTypes.STRING,
      organization: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'report',
    }
  )
  return report
}
