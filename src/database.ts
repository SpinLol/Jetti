import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/db/db.sqlite',
  models: [__dirname + '/**/*.model.ts'],
});

export { sequelize };
