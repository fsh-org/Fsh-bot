const { Events, GatewayIntentBits, ActivityType } = require("discord.js");
const discord = require("discord.js");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  name: Events.guildCreate,
  async execute(fsh, client, guild) {
    console.log("added to "+ guild.name)
  }
};