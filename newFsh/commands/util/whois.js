const Discord = require("discord.js");
const fs = require('fs');

module.exports = {
  name: "whois",
  params: ["domain", true],
  info: "Get whois of a domain",
  category: "utility",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply("You must include a domain")
      return;
    }

    let data = await fetch(`https://api.fsh.plus/whois?url=${encodeURIComponent(arguments2[0])}`);
    data = await data.json();
    if (data.err) {
      message.reply(`error`)
      return;
    }

    var embed = new Discord.EmbedBuilder()
      .setTitle(`Whois "${data.domain}" (${data.id})`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: "png" })
      })
      .setDescription(`DNSSEC: ${data.dnssec||'unsigned'}
Expires: <t:${Math.floor(new Date(data.expires)/1000)}:R> | Created: <t:${Math.floor(new Date(data.created)/1000)}:R>`)
      .addFields({
        name: `Registrar`,
        value: `[${data.registrar.name}](${data.registrar.url}) (ID: ${data.registrar.id})`,
        inline: true
      },
      {
        name: `Abuse`,
        value: `Email: ${data.registrar.abuse.email||'Unknown'}
Phone: ${data.registrar.abuse.phone||'Unknown'}`,
        inline: true
      },
      {
        name: `Status`,
        value: `${data.status.map(e=>e.split(' ')[0]).join('\n')}`,
        inline: true
      },
      {
        name: `Name Servers`,
        value: `${data.ns.join('\n')}`
      });

    message.channel.send({
      embeds: [embed]
    })
  }
};