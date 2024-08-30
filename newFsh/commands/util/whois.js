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
    
    let data = await fetch(`https://api.fsh.plus/whois?url=${arguments2[0]}`);
    data = await data.json();
    if (data.err) {
      message.reply(`error`)
      return;
    }

    var embed = new Discord.EmbedBuilder()
      .setTitle(`Whois of ${data.domain}`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: "png" })
      })
      .setDescription(`ID: ${data.id}
Expires: <t:${Math.floor(new Date(data.expires)/1000)}:R>
Created: <t:${Math.floor(new Date(data.created)/1000)}:R>`)
      .addFields({
        name: `Registrar`,
        value: `Registrar: [${data.registrar.name}](${data.registrar.url})
IANA Id: ${data.registrar.id}
**Abuse:**
- Email: ${data.registrar.abuse.email}
- Phone: ${data.registrar.abuse.phone}`
      },
      {
        name: `Status`,
        value: `${data.status.map(e=>e.split(' ')[0]).join('\n')}`
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