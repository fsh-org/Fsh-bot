const Discord = require("discord.js");

module.exports = {
  name: "role",
  params: ['role', true],
  info: "Role info",
  category: "utility",

  async execute(message, arguments2, fsh) {
    let rol;
    if (arguments2[0]) {
      rol = message.guild.roles.cache.get(arguments2[0].replace(/<|>|@&/g,''));
      if (!rol) {
        message.reply('not a valid role');
        return;
      }
    } else {
      message.reply('you must include a role to get info about');
      return;
    }

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${rol.name} (${rol.id})`)
      .setDescription(`Position: ${rol.rawPosition}
${rol.icon||rol.unicodeEmoji?`Icon: ${rol.unicodeEmoji??`https://cdn.discordapp.com/role-icons/${rol.id}/${rol.icon}.png`}\n`:''}
Hoist: ${rol.hoist?'True':'False'}
Mentionable: ${rol.mentionable?'True':'False'}
Managed: ${rol.managed?'True':'False'}
User selectable: ${rol.flags.has(Discord.RoleFlags.InPrompt)?'True':'False'}`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor(rol.color);

    if (rol.icon) {
      embed.setThumbnail(`https://cdn.discordapp.com/role-icons/${rol.id}/${rol.icon}.png`);
    }

    let perms = [];
    Object.keys(Discord.PermissionFlagsBits).forEach(p=>{
      if (rol.permissions.has(Discord.PermissionFlagsBits[p])) {
        perms.push(p);
      }
    })
    embed.addFields({
      name: `Permissions`,
      value: perms.join(', ')??'None'
    })

    message.channel.send({
      embeds: [embed]
    })
  }
};