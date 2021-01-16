import { Sequelize } from 'sequelize-typescript';

const sequelize =
  process.env.NODE_ENV == 'development'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: 'src/db/db.sqlite',
        models: [__dirname + '/**/*.model.ts'],
      })
    : new Sequelize(process.env.DATABASE_URL, {
        models: [__dirname + '/**/*.model.ts'],
      });

export { sequelize };
