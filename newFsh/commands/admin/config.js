const Discord = require("discord.js");

const dc = require('../../../text/default_config.js')

function truthy(t) {
  return ['true','t','yes','allow','1'].includes(t);
}
const DangerPerms = [Discord.PermissionFlagsBits.Administrator, Discord.PermissionFlagsBits.BanMembers, Discord.PermissionFlagsBits.KickMembers, Discord.PermissionFlagsBits.ManageGuild, Discord.PermissionFlagsBits.ManageChannels, Discord.PermissionFlagsBits.ManageRoles, Discord.PermissionFlagsBits.ManageMessages];
function hasDangerPerms(bitfield) {
  let d = false;
  DangerPerms.forEach(p=>{
    if (d||bitfield.has(p)) d = true;
  });
  return d;
}

module.exports = {
  name: "config",
  info: "Setup cofig for the server",
  category: "admin",

  async execute(message, arguments2, fsh) {
    if (!message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      message.reply("You don't have the Administrator permission");
      return;
    }

    let config = fsh.server_config.get(message.guild.id) ?? dc;

    if (arguments2[0] === 'reset') {
      fsh.server_config.set(message.guild.id, dc);
      message.reply('config reset!');
      return;
    } else if (arguments2[0] === 'set') {
      let name = (arguments2[1]??'').toLowerCase();
      let vals = arguments2.slice(2).map(t=>t.toLowerCase());
      if (name.length<1) {
        message.reply('you must include the name of a setting to change');
        return;
      }
      switch (name) {
        case 'rob':
          config.rob = vals[0]?truthy(vals[0]):(!config.rob);
          message.reply('robbing '+(config.rob?'enabled':'disabled'));
          break;
        case 'token_warn':
          config.token_warn = vals[0]?truthy(vals[0]):(!config.token_warn);
          message.reply('token warning '+(config.token_warn?'enabled':'disabled'));
          break;
        case 'join_gate':
          if (!vals[0]) {
            config.join_gate.active = false;
            message.reply('join gate disabled');
          } else {
            if (!vals[1]||Number.isNaN(Number(vals[0]))||Number.isNaN(Number(vals[1]))) {
              message.reply('needs to be format `limit-number role-id`');
            } else if (!message.guild.members.me.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
              message.reply('i need manage roles permission');
            } else {
              let role = message.guild.roles.cache.get(vals[1]);
              if (!role) {
                message.reply('no such role');
              } else if (role.position>=message.guild.members.me.roles.highest.position) {
                message.reply('the role has to be below my highest role');
              } else if (hasDangerPerms(role.permissions)) {
                message.reply('the role has dangerous permissions, cannot auto assign');
              } else {
                config.join_gate.active = true;
                config.join_gate.limit = Math.min(Math.max(Number(vals[0]), 0), 100);
                config.join_gate.role = vals[1];
                message.reply('join gate enabled');
              }
            }
          }
          break;
        default:
          message.reply('could not find setting');
          return;
      }
      fsh.server_config.set(message.guild.id, config);
      return;
    }

    function bool(value) {
      if (!value) value = false;
      return fsh.emojis[value?'good':'blocker'];
    }

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.admin} Config`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor('#888888')
      .setDescription(`- ${bool(config.rob)} rob: Allow robbing on this server.
- ${bool(config.token_warn)} token_warn: Warn users if a file contains a token.
- ${bool(config.join_gate.active)} join_gate: Adds a role${config.join_gate.role?` (<@&${config.join_gate.role}>)`:''} to a user when they join if over the limit (${config.join_gate.limit??10}).`+/*
- fsh_channel: Channels were people can fsh. (${config.fsh_channel.length?config.fsh_channel.map(s=>`<#${s}>`).join(' ') : 'Everywhere'})
- ${bool(config.leveling.active)} Leveling: Server leveling
Notifications: ${val(config.leveling.notifications.active)} Channel: ${config.leveling.notifications.channel ? `<#${config.leveling.notifications.channel}>` : 'None'}
*/`\n
to update a setting do fsh!config set <name> (value)`);

    message.channel.send({
      embeds: [embed]
    });
  }
};