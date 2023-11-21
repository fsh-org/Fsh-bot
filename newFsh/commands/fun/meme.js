const Discord = require("discord.js");

module.exports = {
  name: "meme",
  info: "Sends random fsh meme",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let img = await fetch("https://api.fsh.plus/meme");
    img = await img.json();
    img = img.link;
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.fun} Meme`)
      .setDescription(`Did someone say memes?`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888")
      .setImage(img);
    message.channel.send({
      embeds: [embed]
    });
  }
};
