import express from 'express';
import cookieParser from 'cookie-parser';

import * as discord from './discord.js';
import * as storage from './storage.js';

const app = express();
app.use(cookieParser(process.env['cookie']));

app.get('/linked-role', async (req, res) => {
  const { url, state } = discord.getOAuthUrl();
  res.cookie('clientState', state, { maxAge: 1000 * 60 * 5, signed: true });
  res.redirect(url);
});

 app.get('/callback-linkedrole', async (req, res) => {
  try {
    const code = req.query['code'];
    const discordState = req.query['state'];

    const { clientState } = req.signedCookies;
    if (clientState !== discordState) {
      return res.sendStatus(403);
    }

    const tokens = await discord.getOAuthTokens(code);

    const meData = await discord.getUserData(tokens);
    const userId = meData.user.id;
    await storage.storeDiscordTokens(userId, {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: Date.now() + tokens.expires_in * 1000,
    });

    await updateMetadata(userId);

    res.send('You did it!  Now go back to Discord.');
  } catch (e) {
    res.sendStatus(500);
  }
});

/**
 * Example route that would be invoked when an external data source changes. 
 * This example calls a common `updateMetadata` method that pushes static
 * data to Discord.
 */
 app.post('/update-metadata', async (req, res) => {
  try {
    const userId = req.body.userId;
    await updateMetadata(userId)

    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
  }
});

async function updateMetadata(userId) {
  const tokens = await storage.getDiscordTokens(userId);

  let metadata = {};
  try {
    metadata = {
      fshtotal: 100
    };
  } catch (e) {
    // Ignore
  }

  await discord.pushMetadata(userId, tokens, metadata);
}

app.listen(20210)