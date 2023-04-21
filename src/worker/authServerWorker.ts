import * as path from 'path';
import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import { AUTHSERVER, DEEPLINK } from '../shared/constants';
import {
  IAuthServerPayload,
  PayloadType,
  IOauthToken,
  IBasePayload
} from '../shared/payloadInterface';

const app = express();
const authClient = new OAuth2Client({
  clientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
  clientSecret: import.meta.env.VITE_OAUTH_CLIENT_SECRET,
  redirectUri: `http://127.0.0.1:${AUTHSERVER.PORT}${AUTHSERVER.OAUTH_PATH}`
});

app.use(express.static(path.join(__dirname)));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

app.get(AUTHSERVER.OAUTH_PATH, async (req, res) => {
  const tokenData: IOauthToken = (await authClient.getToken(req.query.code as string)).tokens;
  const payload: IAuthServerPayload = {
    type: PayloadType.AUTH,
    token: tokenData
  };
  process.parentPort.postMessage(payload);
  res.redirect(AUTHSERVER.LOGIN_SUCESS_PATH);
});

app.get(AUTHSERVER.LOGIN_SUCESS_PATH, (_req, res) => {
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
