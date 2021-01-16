import { Sequelize } from 'sequelize-typescript';

const sequelize =
  process.env.NODE_ENV == 'development'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: 'src/db/db.sqlite',
      })
    : new Sequelize(process.env.DATABASE_URL);

sequelize.addModels([__dirname + '/**/*.model.ts']);

export { sequelize };
