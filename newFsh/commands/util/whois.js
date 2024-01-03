const Discord = require("discord.js");
const fs = require('fs');

module.exports = {
  name: "whois",
  params: ["domain", true],
  info: "Get whois of a domain",
  category: "utility",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply("You must include a ip or domain")
      return;
    }

    let thong = arguments2[0];
    if (thong.includes("://")) {
      thong = thong.split("://")[1]
    }
    thong = thong.split("/")[0]
    thong = thong.replace("www.", "")
    
    let data = await fetch(`https://networkcalc.com/api/dns/whois/${thong}`);
    data = await data.json();
    if (data.status != "OK") {
      message.reply(`error`)
      return;
    }

    var embed = new Discord.EmbedBuilder()
      .setTitle(`Whois of ${data.hostname}`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: "png" })
      })
      .addFields({
        name: `Status`,
        value: `${data.whois.domain_status || "None"}
${data.whois.domain_status_description || "No description"}`
      },
      {
        name: `Abuse`,
        value: `Email: ${data.whois.abuse_email || "None"}
Phone: ${data.whois.abuse_phone || "None"}`
      },
      {
        name: `Registrar`,
        value: `Registrar: ${data.whois.registrar || "None"}
IANA Id: ${data.whois.registrar_iana_id || "None"}
Domain id: ${data.whois.registry_domain_id || "None"}
Expires: <t:${Math.floor(new Date(data.whois.registry_expiration_date)/1000)}:R>
Created: <t:${Math.floor(new Date(data.whois.registry_created_date)/1000)}:R>`
      });

    message.channel.send({
      embeds: [embed]
    })
  }
};