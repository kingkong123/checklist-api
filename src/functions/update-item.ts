import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import 'reflect-metadata'

import { getDataSourceAsync } from '../shared/db-datasource';
import { ToDoItems } from '../shared/entities/todo-items';

import corsHeader from '../shared/cors-header';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { httpMethod, body } = event;

  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        ...corsHeader({ allowMethods: 'PUT' })
      }
    };
  }

  if (httpMethod !== 'PUT') {
    return {
      statusCode: 404,
      headers: {
        ...corsHeader()
      }
    };
  }

  console.log('body: ', body, typeof body);

  const { id, checked } = JSON.parse(body);

  const dataSource = await getDataSourceAsync();
  const repo = dataSource.getRepository(ToDoItems);

  if (id) {
    const item = await repo.findOneBy({ id });

    item.completed = checked;
    await repo.save(item);
  }

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
