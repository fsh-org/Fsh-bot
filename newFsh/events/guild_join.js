const { Events, GatewayIntentBits, ActivityType } = require("discord.js");
const Discord = require("discord.js");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const dc = require('../../text/default_config.js')

module.exports = {
  name: Events.GuildCreate,
  async execute(fsh, guild) {
    fsh.server_config.set(guild.id, dc);
  }
};