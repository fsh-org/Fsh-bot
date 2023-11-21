const Discord = require("discord.js");

module.exports = {
  name: "malpedia",
  params: ['query', true],
  info: "Search for a specific malwere",
  category: "fun",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply("include a query");
      return;
    }
    
    let data = await fetch(`https://malpedia.caad.fkie.fraunhofer.de/backend/quicksearch?needle=${arguments2.join("%20")}`);
    data = await data.json();

    if (data.data[0]) {
      let dutu = [];
      data.data.slice(0,10).forEach(deta => {
        dutu.push(`1. ${deta.class} - ${deta.common_name.trim()} ([${deta.name.trim()}](<https://malpedia.caad.fkie.fraunhofer.de${deta.url}>))`)
      })
      let embed = new Discord.EmbedBuilder()
        .setTitle(`Malpedia search`)
        .setTimestamp()
        .setFooter({ text: `V${fsh.version}` })
        .setDescription(dutu.join("\n"))
        .setColor("#888888");

      message.channel.send({
        embeds: [embed]
      })
    } else {
      message.reply("not found")
    }
  }
};