import 'reflect-metadata'

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

import corsHeader from '../shared/cors-header';
import { HttpMethods } from '../shared/enums/http-methods';
import { addAsync, getAsync, updateAsync, deleteAsync } from '../shared/features';

const successResponse = (responseData?) => ({
  statusCode: 200,
  headers: {
    ...corsHeader()
  },
  body: responseData ? JSON.stringify({ message: 'success', data: responseData }) : undefined,
})

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { httpMethod, body } = event;

  if (httpMethod === HttpMethods.OPTIONS) {
    return {
      statusCode: 200,
      headers: {
        ...corsHeader({ allowMethods: 'GET, POST, PUT, DELETE' })
      }
    };
  }

  switch (httpMethod) {
    case HttpMethods.GET: {
      const res = await getAsync({ search: event.queryStringParameters.search });

      return successResponse(res);
    }

    case HttpMethods.POST: {
      const { itemName } = JSON.parse(body);
      const res = await addAsync({ itemName });

      return successResponse(res);
    }

    case HttpMethods.PUT: {
      const { id, checked } = JSON.parse(body);
      const res = await updateAsync({ id, checked });

      return successResponse(res);
    }

    case HttpMethods.DELETE:
      const res = await deleteAsync();

      return successResponse(res);

    default:
      return {
        statusCode: 404,
        headers: {
          ...corsHeader()
        }
      };
  }
};

export { handler };
