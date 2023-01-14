/* eslint-disable import/first */
import dotenv from 'dotenv';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

dotenv.config();

import meetupRouter from 'routes/meetups';
import swaggerSpecs from 'helpers/swagger-specs';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use('/meetups', meetupRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is working on PORT: ${PORT}`));
