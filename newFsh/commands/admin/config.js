const Discord = require("discord.js");

const dc = require('../../../text/default_config.js')
const lat = dc.version;

module.exports = {
  name: "config",
  info: "Setup the bots cofig for your server",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    // temp dev only //
    if (!fsh.devIds.includes(message.author.id)) return;
    // ------------- //
    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
      message.channel.send("You don't have the Administrator permission");
      return;
    }

    let ver = fsh.server_config.get(message.guild.id).version;

    if (arguments2[0] === 'update') {
      if (ver === lat) {message.reply("alredy on lastest config, you can reset using fsh!config reset");return;}
      let con = fsh.server_config.get(message.guild.id) || {};
      let ne = structuredClone(dc);
      Object.keys(ne).forEach(key => {
        if ((Object.keys(con)||[]).includes(key) && key != "version") {
          ne[key] = con[key]
        }
      })
      fsh.server_config.set(message.guild.id, ne)
      message.reply("updated!")
      return;
    }
    if (arguments2[0] === 'reset') {
      fsh.server_config.set(message.guild.id, dc)
      message.reply("config reset!")
      return;
    }

    let con = fsh.server_config.get(message.guild.id) || {};

    if (arguments2[0] === 'set') {
      if (!arguments2[1]) {
        message.reply('you must include the name of a setting to change');
        return;
      }
      if (arguments2[1] === 'version' || (!Object.keys(con).includes(arguments2[1]))) {
        message.reply('could not find setting');
        return;
      }
      switch (arguments2[1]) {
        case 'rob':
          con.rob = (!(con.rob ?? true));
          message.reply('robbing '+(con.rob?'enabled':'disabled'))
          fsh.server_config.set(message.guild.id, con)
          break;
        case 'token_warn':
          con.token_warn = (!(con.token_warn ?? true));
          message.reply('token warning '+(con.token_warn?'enabled':'disabled'))
          fsh.server_config.set(message.guild.id, con)
          break;
        default:
          message.reply('could not change setting')
      }
      return;
    }

    function val(value) {
      if (!value) value = false;
      return (value ? fsh.emojis.good : fsh.emojis.blocker);
    }
    
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.admin} Config`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888")
      .setDescription(`${ver === lat ? '' : 'Your config is out of date, use `config update` to upgrade config\n'}**Options:**
- ${val(con.rob)} Rob: Allow robbing on this server.
- ${val(con.token_warn)} Token_Warn: Warn users if a file contains a token.`+/*
- ${val(con.join_gate.active)} Join\\_Gate: Adds role to user on join if over the limit
Limit: ${con.join_gate.limit} Role: ${con.join_gate.role ? `<@&${con.join_gate.role}>` : 'None'}
- Command\\_Channel: Channels were fsh commands can be used
${con.command_channel.length ? con.command_channel.map(s=>`<#${s}>`).join(' ') : 'Everywhere'}
- ${val(con.leveling.active)} Leveling: Server leveling
Notifications: ${val(con.leveling.notifications.active)} Channel: ${con.leveling.notifications.channel ? `<#${con.leveling.notifications.channel}>` : 'None'}
*/`\n
to update a setting do fsh!config set <name>`);

    message.channel.send({
      embeds: [embed]
    })
  }
};