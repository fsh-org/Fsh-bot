const Discord = require("discord.js");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const videos = ['1goAp0XmhZQ','jpO2zd9zbng']
function randomVideo() {
  return videos[Math.floor(Math.random()*videos.length)];
}

module.exports = {
  name: Discord.Events.ClientReady,
  //once: true,
  async execute(c, client) {
    console.log(`${client.user.displayName} [1;33mstarted[0m`);

    if (process.env['topgg']) {
      fetch(`https://top.gg/api/bots/${client.user.id}/stats`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${process.env['topgg']}`
        },
        body: JSON.stringify({
          server_count: client.guilds.cache.size
        })
      });
    }

    await require('../server.js').execute(c);

    while (true) {
      c.client.user.setPresence({
        activities: [{
          name: `Fsh -  ${c.client.ws.ping}ms`,
          type: Discord.ActivityType.Streaming,
          url: 'https://youtube.com/watch?v='+randomVideo()
        }],
        status: 'online',
      });
      await delay(10000);
    }
  }
};