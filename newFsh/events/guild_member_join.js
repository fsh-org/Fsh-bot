const Discord = require('discord.js');
const UserCheck = require('../user-check.js');

module.exports = {
  name: Discord.Events.GuildMemberAdd,
  async execute(fsh, member) {
    let config = fsh.server_config.get(member.guild.id);
    if (!config.join_gate.active) return;
    let sus = UserCheck(member.user, member);
    if (sus<config.join_gate.limit) return;
    try {
      let role = member.guild.roles.cache.get(config.join_gate.role);
      member.roles.add(role);
    } catch(err) {
      // Ignore :3
    }
  }
};