/* eslint-disable import/first */
import dotenv from 'dotenv';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

dotenv.config();

import meetupRouter from 'routes/meetups';
import authorizationRouter from 'routes/authorization';
import swaggerSpecs from 'helpers/swagger-specs';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use('/authorization', authorizationRouter);
app.use('/meetups', meetupRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is working on PORT: ${PORT}`));
