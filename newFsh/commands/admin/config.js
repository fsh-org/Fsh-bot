const Discord = require("discord.js");

const dc = require('../../../text/default_config.js')

module.exports = {
  name: "config",
  info: "Setup cofig for the server",
  category: "admin",

  async execute(message, arguments2, fsh) {
    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
      message.channel.send("You don't have the Administrator permission");
      return;
    }

    let config = fsh.server_config.get(message.guild.id) ?? dc;

    if (arguments2[0] === 'reset') {
      fsh.server_config.set(message.guild.id, dc);
      message.reply('config reset!');
      return;
    } else if (arguments2[0] === 'set') {
      let name = (arguments2[1]??'').toLowerCase();
      let val = (arguments2[2]??'').toLowerCase();
      if (name.length<1) {
        message.reply('you must include the name of a setting to change');
        return;
      }
      switch (name) {
        case 'rob':
          config.rob = val?(val==='true'):(!config.rob);
          message.reply('robbing '+(config.rob?'enabled':'disabled'));
          fsh.server_config.set(message.guild.id, config);
          break;
        case 'token_warn':
          config.token_warn = val?(val==='true'):(!config.token_warn);
          message.reply('token warning '+(config.token_warn?'enabled':'disabled'));
          fsh.server_config.set(message.guild.id, config);
          break;
        default:
          message.reply('could not find setting');
      }
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
- ${bool(config.token_warn)} token_warn: Warn users if a file contains a token.`+/*
- ${bool(con.join_gate.active)} join_gate: Adds a role to a user when they join if over the limit.${con.join_gate.role?` (<@&${con.join_gate.role}>)`:''}
join_gate_limit: ${con.join_gate.limit??10}
- fsh_channel: Channels were people can fsh. (${con.fsh_channel.length?con.fsh_channel.map(s=>`<#${s}>`).join(' ') : 'Everywhere'})
- ${bool(con.leveling.active)} Leveling: Server leveling
Notifications: ${val(con.leveling.notifications.active)} Channel: ${con.leveling.notifications.channel ? `<#${con.leveling.notifications.channel}>` : 'None'}
*/`\n
to update a setting do fsh!config set <name> (value)`);

    message.channel.send({
      embeds: [embed]
    });
  }
};