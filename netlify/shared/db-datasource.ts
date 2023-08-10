import { DataSource } from 'typeorm';

import { ToDoItems } from './entities/todo-items';

const {
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD
} = process.env;

const getDataSourceAsync = async () => {
  const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    extra: {
      ssl: {
        rejectUnauthorized: true
      }
    },
    entities: [ToDoItems]
  });

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  return AppDataSource;
};

export { getDataSourceAsync }