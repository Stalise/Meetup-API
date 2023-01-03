import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.get('/', (_, res) => {
  res.send('server is ready.');
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is working on PORT: ${PORT}`));
