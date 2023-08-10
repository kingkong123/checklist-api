import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { HandlerEvent } from '@netlify/functions';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

const convertToNetlifyEvent = (req: Request): HandlerEvent => ({
  httpMethod: req.method,
  rawUrl: req.originalUrl,
  rawQuery: '',
  path: req.path,
  headers: {},
  multiValueHeaders: {},
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  body: req.body,
  isBase64Encoded: true
});

app.use(bodyParser.json())
app.use(cors());

app.all('*', async (req: Request, res: Response) => {
  try {
    const { handler } = require(`${__dirname}/../netlify/functions${req.url}.ts`);
    const { statusCode, headers, body } = await handler(convertToNetlifyEvent(req));

    if (headers) {
      for (let k in headers) {
        res.set(k, headers[k]);
      }
    }

    if (statusCode) {
      res.status(statusCode);
    }

    res.send(body);
  } catch (exception) {
    if (exception.code === 'MODULE_NOT_FOUND') {
      res.status(404);
      return res.send(exception.code);
    }

    console.log(exception);
    res.status(500);
    res.send(exception.code);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});