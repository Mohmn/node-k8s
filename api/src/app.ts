import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { NotFoundError, } from './errors';
import { errorHandler } from './middlewares/error-handler';
import { isPrimeNumberRouter } from './routes/prime';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(isPrimeNumberRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
