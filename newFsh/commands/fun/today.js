const Discord = require("discord.js");

module.exports = {
  name: "today",
  info: "Events that happened today",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let data = await fetch(`https://today.zenquotes.io/api`);
    data = await data.json()
    
    var embed = new Discord.EmbedBuilder()
      .setTitle(`Today ${data.date.replace("_"," ")}`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setDescription(data.data.Events.slice(0,4).map(e=>{return e.text}).join("\n\n").replaceAll("&#8211;","–"));

    message.channel.send({
      embeds: [embed]
    })
  }
};