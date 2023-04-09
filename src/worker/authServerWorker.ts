import * as path from 'path';
import express from 'express';
import { AUTHSERVER, DEEPLINK } from '../shared/constants';
import { IAuthServerPayload, PayloadType, IOauthToken } from '../shared/payloadInterface';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/oauth', async (req, res) => {
  const response = await fetch(`${import.meta.env.VITE_OAUTH_TOKEN_URL}?code=${req.query.code}`);
  const tokenData: IOauthToken = await response.json();
  const payload: IAuthServerPayload = {
    type: PayloadType.AUTH,
    token: tokenData
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
