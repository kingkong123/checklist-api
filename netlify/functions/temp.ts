import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://checklist-ui-1982d5.netlify.app'
    },
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };
