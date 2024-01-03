const Discord = require("discord.js");
const fs = require('fs');

module.exports = {
  name: "dns",
  params: ["domain", true],
  info: "Get dns info of a domain",
  category: "utility",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply("You must include a domain")
      return;
    }

    let thong = arguments2[0];
    if (thong.includes("://")) {
      thong = thong.split("/")[2]
    }
    
    let data = await fetch(`https://networkcalc.com/api/dns/lookup/${thong}`);
    data = await data.json();
    if (data.status != "OK") {
      message.reply(`could not get`)
      return;
    }

    var embed = new Discord.EmbedBuilder()
      .setTitle(`DNS Info of ${data.hostname}`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: "png" })
      })
      .addFields({
        name: `A`,
        value: data.records.A.map(e=>{return `${e.address} | TTL: ${e.ttl}`}).join("\n") || "None",
        inline: true
      },
      {
        name: `CNAME`,
        value: data.records.CNAME.map(e=>{return `${e.address} | TTL: ${e.ttl}`}).join("\n") || "None",
        inline: true
      },
      {
        name: `MX`,
        value: data.records.MX.map(e=>{return `${e.exchange} | Priority: ${e.priority}`}).join("\n") || "None",
        inline: true
      },
      {
        name: `NS`,
        value: data.records.NS.map(e=>{return e.nameserver}).join("\n") || "None",
        inline: true
      },
      {
        name: `SOA`,
        value: data.records.SOA.map(e=>{return `${e.nameserver} | Master: ${e.hostmaster}`}).join("\n") || "None",
        inline: true
      },
      {
        name: `TXT`,
        value: data.records.TXT.join("\n") || "None",
        inline: false
      });

    message.channel.send({
      embeds: [embed]
    })
  }
};