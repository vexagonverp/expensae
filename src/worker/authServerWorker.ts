import express from 'express';

const app = express();
const port = 8719;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Auth server listening on port ${port}`);
});
