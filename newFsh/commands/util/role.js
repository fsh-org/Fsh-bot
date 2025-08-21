const Discord = require("discord.js");

function intToHex(code){
  return `#${code.toString(16).padStart(6, '0')}`;
};

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
Color: ${intToHex(rol.colors.primaryColor)}${rol.colors.secondaryColor?' > '+intToHex(rol.colors.secondaryColor):''}${rol.colors.tertiaryColor?' > '+intToHex(rol.colors.tertiaryColor):''}
Created: <t:${Math.floor(rol.createdTimestamp/1000)}:R>
${rol.icon||rol.unicodeEmoji?`Icon: ${rol.unicodeEmoji??`https://cdn.discordapp.com/role-icons/${rol.id}/${rol.icon}.png`}\n`:''}
Hoist: ${rol.hoist?'True':'False'}
Mentionable: ${rol.mentionable?'True':'False'}
Managed: ${rol.managed?'True':'False'}
User selectable: ${rol.flags.has(Discord.RoleFlags.InPrompt)?'True':'False'}${rol.tags?.availableForPurchase?'\nPurchasable':''}
${rol.tags?.botId?'For bot <@'+rol.tags.botId+'>':''}`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor(rol.colors.primaryColor);

    if (rol.icon) {
      embed.setThumbnail(`https://cdn.discordapp.com/role-icons/${rol.id}/${rol.icon}.png`);
    }

    if (rol.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      embed.addFields({
        name: 'Permissions',
        value: 'Administrator (All)'
      });
    } else {
      let perms = [];
      Object.keys(Discord.PermissionFlagsBits).forEach(p=>{
        if (rol.permissions.has(Discord.PermissionFlagsBits[p])) {
          perms.push(p);
        }
      });
      embed.addFields({
        name: 'Permissions',
        value: perms.join(', ')||'None'
      });
    }

    message.channel.send({
      embeds: [embed]
    })
  }
};