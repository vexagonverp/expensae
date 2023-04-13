import * as path from 'path';
import express from 'express';
import { AUTHSERVER, DEEPLINK } from '../shared/constants';
import {
  IAuthServerPayload,
  PayloadType,
  IOauthToken,
  IBasePayload
} from '../shared/payloadInterface';

enum ServerPath {
  OAUTH_PATH = '/oauth',
  LOGIN_SUCESS_PATH = '/login-success'
}

const app = express();

app.use(express.static(path.join(__dirname)));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

app.get(ServerPath.OAUTH_PATH, async (req, res) => {
  const response = await fetch(`${import.meta.env.VITE_OAUTH_TOKEN_URL}?code=${req.query.code}`);
  const tokenData: IOauthToken = await response.json();
  const payload: IAuthServerPayload = {
    type: PayloadType.AUTH,
    token: tokenData
  };
  process.parentPort.postMessage(payload);
  res.redirect(ServerPath.LOGIN_SUCESS_PATH);
});

app.get(ServerPath.LOGIN_SUCESS_PATH, (_req, res) => {
  const openAppPayload: IBasePayload = {
    type: PayloadType.OPEN
  };
  res.render('login-success.ejs', {
    deeplink: `${DEEPLINK.NAME_SPACE}://${JSON.stringify(openAppPayload)}`
  });
});

function startServer(port = AUTHSERVER.PORT) {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Auth server listening at http://localhost:${port}`);
  });
}

startServer();
