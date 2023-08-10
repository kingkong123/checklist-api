import { Like } from 'typeorm';
import { getDataSourceAsync } from '../db-datasource';
import { ToDoItems } from '../entities/todo-items';

import { TodoItem } from "../interfaces/Todo";

interface GetItems {
  search?: string;
}

const feature = async ({ search }: GetItems): Promise<TodoItem[]> => {
  const dataSource = await getDataSourceAsync();

  const repo = dataSource.getRepository(ToDoItems);

  let result;
  if (search) {
    console.log(123, search);
    result = await repo.findBy({
      itemName: Like(`%${search}%`)
    });
  } else {
    result = await repo.createQueryBuilder('todo').orderBy('todo.itemName', 'ASC').getMany();
  }

  return result;
};

export default feature;
