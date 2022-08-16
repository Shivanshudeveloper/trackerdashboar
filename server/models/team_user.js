'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class team_user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    team_user.init(
        {
            fullName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            organization: DataTypes.STRING,
            team: DataTypes.STRING,
            role: DataTypes.STRING,
            profilePicture: DataTypes.STRING,
            isVerified: DataTypes.BOOLEAN,
            visibility: DataTypes.BOOLEAN,
            time: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'team_user',
        }
    )
    return team_user
}
