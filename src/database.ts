import { Sequelize } from 'sequelize-typescript';
import Player from './db/models/Player.model';

const sequelize =
  process.env.NODE_ENV == 'development'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: 'src/db/db.sqlite',
      })
    : new Sequelize(process.env.DATABASE_URL);

sequelize.addModels([Player]);

export { sequelize };
