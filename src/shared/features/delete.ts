import { getDataSourceAsync } from '../db-datasource';
import { ToDoItems } from '../entities/todo-items';

import { TodoItem } from "../interfaces/Todo";

const feature = async (): Promise<TodoItem[]> => {
    const dataSource = await getDataSourceAsync();
    const repo = dataSource.getRepository(ToDoItems);

    await repo.createQueryBuilder('todo').delete().from(ToDoItems).where('1').execute();

    const result = await repo.createQueryBuilder('todo').orderBy('todo.itemName', 'ASC').getMany();

    return result;
};

export default feature;
