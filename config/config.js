require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'src/db/db.sqlite',
  },
  devPostgres: {
    username: 'postgres',
    password: 'password',
    database: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
