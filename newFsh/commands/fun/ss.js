const Discord = require("discord.js");

module.exports = {
  name: "ss",
  params: ["url", true],
  info: "Returns a image of the website",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let embed = new Discord.EmbedBuilder()
      .setTitle(
        `${fsh.emojis.website} ScreenShot of ${
          arguments2[0].includes("http") ? "" : "https://"
        }${arguments2[0]}`
      )
      .setDescription(`** **`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL({ format: "png" }),
      })
      .setColor("#888888")
      .setImage(
        `https://api.popcat.xyz/screenshot?url=${
          arguments2[0].includes("http") ? "" : "https://"
        }${arguments2[0]}`
      );
    message.channel.send({
      embeds: [embed],
    });
  },
};
