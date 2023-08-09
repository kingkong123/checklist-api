import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

import corsHeader from '../shared/cors-header';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  return {
    statusCode: 200,
    headers: {
      ...corsHeader()
    },
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };
