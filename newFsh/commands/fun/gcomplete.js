const Discord = require("discord.js");

module.exports = {
  name: "gcomplete",
  params: ["query", true],
  info: "Let google finish a sentence",
  category: "fun",
  
  async execute(message, arguments2, fsh) {
    if (arguments2.length < 1) {
      message.reply("Include a query");
      return;
    }
    
    let data = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${arguments2.join(" ")}`);
    data = await data.json();

    var embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.google} Google complete "${arguments2.join(" ")}"`)
      .setDescription(data[1].join("\n"))
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL({ format: "png" }),
      })
      .setColor("#888888");

    message.channel.send({
      embeds: [embed]
    });
  }
};
