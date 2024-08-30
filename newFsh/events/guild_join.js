const { Events, GatewayIntentBits, ActivityType } = require("discord.js");
const Discord = require("discord.js");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  name: Events.GuildCreate,
  async execute(fsh, guild) {
    fsh.server_config.set(guild.id, {
      rob: true,
      token_warn: true,
      join_gate: {
        active: false,
        limit: 10,
        role: ''
      },
			command_channel: [],
      leveling: {
        active: false,
        notifications: {
          active: false,
          channel: ''
        }
      },
      version: 1
    });
  }
};