const Discord = require("discord.js");

const dc = require('../../text/default_config.js')

module.exports = {
  name: Discord.Events.GuildCreate,
  async execute(fsh, guild) {
    fsh.server_config.set(guild.id, dc);
  }
};