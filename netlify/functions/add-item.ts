import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

import { getDataSourceAsync } from '../shared/db-datasource';
import { ToDoItems } from '../shared/entities/todo-items';

import corsHeader from '../shared/cors-header';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { httpMethod, body } = event;
  if (httpMethod !== 'POST') {
    return {
      statusCode: 404,
      headers: {
        ...corsHeader()
      }
    };
  }

  const dataSource = await getDataSourceAsync();

  const toDoItem = new ToDoItems();
  toDoItem.itemName = (body as any).itemName;

  const repo = dataSource.getRepository(ToDoItems);

  await repo.save(toDoItem);

  const result = await repo.createQueryBuilder('todo').orderBy('todo.itemName', 'ASC').getMany();

  return {
    statusCode: 200,
    headers: {
      ...corsHeader()
    },
    body: JSON.stringify({ message: 'success', data: result }),
  };
};

export { handler };