require('dotenv').config()
const Sequelize = require('sequelize')

const connectDB = () => {
    const sequelize = new Sequelize(`${process.env.CONNECTION_STRING}`, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    })

    sequelize
        .authenticate()
        .then(() => {
            console.log(
                'Connection has been established successfully.'.cyan.bold
            )
        })
        .catch((err) => {
            console.error('Unable to connect to the database:'.red.bold, err)
        })
}

module.exports = connectDB
