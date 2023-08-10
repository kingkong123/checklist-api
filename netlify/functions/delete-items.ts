import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

import { getDataSourceAsync } from '../shared/db-datasource';
import { ToDoItems } from '../shared/entities/todo-items';

import corsHeader from '../shared/cors-header';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { httpMethod } = event;
  if (httpMethod !== 'DELETE') {
    return {
      statusCode: 404,
      headers: {
        ...corsHeader()
      }
    };
  }

  const dataSource = await getDataSourceAsync();
  const repo = dataSource.getRepository(ToDoItems);

  await repo.createQueryBuilder('todo').delete().from(ToDoItems).where('1').execute();

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
