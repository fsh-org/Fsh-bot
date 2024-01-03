const { Events, GatewayIntentBits, ActivityType } = require("discord.js");
const Discord = require("discord.js");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  name: Events.GuildCreate,
  async execute(fsh, guild) {
    fsh.server_config.set(guild.id, {
      rob: true,
      join_gate: {
        active: false,
        limit: 8,
        role: ''
      },
			dj_role: '',
			command_channel: [],
      leveling: {
        active: false,
        notifications: {
          active: false,
          channel: ''
        }
      },
      token_warn: true,
      version: 1.2
    });
  }
};

/*
what settings we gonna add?

do we add join gate? like if >x sus it adds a rol

*/