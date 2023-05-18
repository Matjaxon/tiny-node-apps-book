import { Sequelize } from 'sequelize';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite'
});

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (e) {
  console.error('Unable to connect to the database:', error);
}

export default {
  Sequelize,
  db
};
