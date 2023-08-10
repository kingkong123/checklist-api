import { getDataSourceAsync } from '../db-datasource';
import { ToDoItems } from '../entities/todo-items';

import { TodoItem } from "../interfaces/Todo";

interface AddItem {
  itemName: string;
}

const feature = async ({ itemName = null }: AddItem): Promise<TodoItem[]> => {
  const dataSource = await getDataSourceAsync();
  const repo = dataSource.getRepository(ToDoItems);

  if (itemName) {
    const toDoItem = new ToDoItems();
    toDoItem.itemName = itemName;

    await repo.save(toDoItem);
  }

  const result = await repo.createQueryBuilder('todo').orderBy('todo.itemName', 'ASC').getMany();

  return result;
};

export default feature;
