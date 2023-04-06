import * as path from 'path';
import express from 'express';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello');
});

function startServer(port = 8719) {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Auth server listening at http://localhost:${port}`);
  });
}

startServer();
