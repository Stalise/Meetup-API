/* eslint-disable import/first */
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import meetupRouter from 'routes/meetup-routes';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());

app.use('/meetup', meetupRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is working on PORT: ${PORT}`));
