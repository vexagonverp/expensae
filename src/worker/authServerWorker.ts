import * as path from 'path';
import express from 'express';
import { AUTHSERVER, DEEPLINK } from 'src/shared/constants';
import { IAuthServerPayload, PayloadType } from 'src/shared/payloadInterface';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/oauth', (req, res) => {
  const payload: IAuthServerPayload = {
    type: PayloadType.AUTH,
    code: req.query.code as string
  };
  res.redirect(301, `${DEEPLINK.NAME_SPACE}://${encodeURIComponent(JSON.stringify(payload))}`);
});

function startServer(port = AUTHSERVER.PORT) {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Auth server listening at http://localhost:${port}`);
  });
}

startServer();
