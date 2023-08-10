import { getDataSourceAsync } from '../db-datasource';
import { ToDoItems } from '../entities/todo-items';

import { TodoItem } from "../interfaces/Todo";

interface UpdateItem {
  id: string;
  checked: boolean;
}

const feature = async ({ id, checked }: UpdateItem): Promise<TodoItem[]> => {
  const dataSource = await getDataSourceAsync();
  const repo = dataSource.getRepository(ToDoItems);

  if (id) {
    const item = await repo.findOneBy({ id });

    item.completed = checked;
    await repo.save(item);
  }

  const result = await repo.createQueryBuilder('todo').orderBy('todo.itemName', 'ASC').getMany();

  return result;
};

export default feature;
