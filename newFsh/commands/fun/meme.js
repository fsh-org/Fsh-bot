const Discord = require("discord.js");

module.exports = {
  name: "meme",
  slash: true,
  category: "fun",

  async execute(interaction, arguments, fsh) {
    let inner = fsh.getInnerLocale(interaction);

    let img = await fetch("https://api.fsh.plus/meme");
    img = await img.json();

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.fun} Meme`)
      .setDescription(inner.desc)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888")
      .setImage(img.link);

    interaction.reply({
      embeds: [embed]
    });
  }
};