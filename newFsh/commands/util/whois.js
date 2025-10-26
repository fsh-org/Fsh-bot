const Discord = require("discord.js");

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
      .setTitle(`Whois "${data.domain}" (${data.id||'Unknown id'})`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor('#888888')
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: "png" })
      })
      .setDescription(`DNSSEC: ${data.dnssec||'Unsigned'}
Expires: ${data.expires?`<t:${Math.floor(new Date(data.expires)/1000)}:R>`:'Unknown'} | Created: ${data.created?`<t:${Math.floor(new Date(data.created)/1000)}:R>`:'Unknown'}`)
      .addFields({
        name: 'Registrar',
        value: data.registrar.name?`[${data.registrar.name}](${data.registrar.url}) (ID: ${data.registrar.id})`:'No registrar info',
        inline: true
      },
      {
        name: 'Abuse',
        value: `Email: ${data.registrar.abuse.email||'Unknown'}
Phone: ${data.registrar.abuse.phone||'Unknown'}`,
        inline: true
      },
      {
        name: 'Status',
        value: data.status.map(e=>e.split(' ')[0]).join('\n')||'No status',
        inline: true
      },
      {
        name: 'Name Servers',
        value: data.ns.join('\n')
      });

    message.channel.send({
      embeds: [embed]
    })
  }
};