const { Events, GatewayIntentBits, ActivityType } = require("discord.js");
const discord = require("discord.js");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  name: Events.ClientReady,
  //once: true,
  async execute(c, client) {
    console.log(`${client.user.displayName} [1;33mstarted[0m`);
    await require("../server.js").execute(c);
    
    while (true) {
      c.client.user.setPresence({
        activities: [
          {
            name: `Fsh -  ${c.client.ws.ping}ms`,
            type: ActivityType.Streaming,
            url: "https://youtube.com/watch?v=1goAp0XmhZQ",
          },
        ],
        status: "online",
      });
      await delay(10000)
    }
    /*
    while (true) {
      c.client.user.setActivity({
        name: `Fsh -  ${c.client.ws.ping}ms`,
        type: discord.ActivityType.Watching,
        url: "https://www.youtube.com/watch?v=jpO2zd9zbng",
      });
    }*/
    /*
          c.client.user.setActivity(
            ["fsh - ", c.client.ws.ping, "ms"].join(""),,
            {
              type: "STREAMING",
              url: "https://www.youtube.com/watch?v=jpO2zd9zbng",
            }
          );
    await delay(10000);*/
  },
};
