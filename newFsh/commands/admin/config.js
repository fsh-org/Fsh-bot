const Discord = require("discord.js");

const lat = 1.2

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

    if (arguments2[0] == 'update') {
      if (ver == lat) {message.reply("alredy lastest.");return;}
      let con = fsh.server_config.get(message.guild.id) || {};
      let ne = {
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
      }
      Object.keys(ne).forEach(key => {
        if ((Object.keys(con)||[]).includes(key) && key != "version") {
          ne[key] = con[key]
        }
      })
      fsh.server_config.set(message.guild.id, ne)
      message.reply("updated!")
      return;
    }

    function val(value) {
      return (typeof value == "boolean" ? (value ? fsh.emojis.good : fsh.emojis.blocker) : value)
    }
    
    let con = fsh.server_config.get(message.guild.id) || {};
    
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.admin} Config`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888")
      .setDescription(`${ver == lat ? 'Lastest server config' : 'Your config is out of date, use `config update` to upgrade config'}
**Options:**
- Robbing (\`rob\`) ${val(con.rob || false)}
Allow robbing
- Tokens in files (\`token\`) ${val(con.token_warn || false)}
If a file with a bot token is detected it warns the user
- Join gate (\`join\`) ${val(con.join_gate.active || false)}
Limit: ${val(con.join_gate.limit)} Role: <@&${val(con.join_gate.role)}>
Adds role to user on join if over the limit
- DJ Role (\`dj\`) <@&${val(con.dj_role)}>
Make only people with this role use music
- Commands channel (\`cmd\`)
${con.command_channel.length ? "<#":""}${val(con.command_channel.join(">, <#")) || "Everywhere"}${con.command_channel.length ? ">":""}
Limit were fsh commands can be used
- Leveling (\`level\`) ${val(con.leveling.active || false)}
Notifications: ${val(con.leveling.notifications.active)} Channel: ${con.leveling.notifications.channel ? "<#":""}${val(con.leveling.notifications.channel)}${con.leveling.notifications.channel ? ">":""}
Server leveling`);

    message.channel.send({
      embeds: [embed]
    })
  }
};