const Discord = require("discord.js");

module.exports = {
  name: "ss",
  params: ["url", true],
  info: "Returns a image of the website",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    let title = arguments2[0].replace(/https?:\/\//,'').split("?")[0];
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.website} ScreenShot of https://${title}`)
      .setURL((arguments2[0].includes("://")?'':'https://') + arguments2[0])
      .setDescription(`** **`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL({ format: "png" }),
      })
      .setColor("#888888")
      .setImage(`https://poopoo-api.vercel.app/api/image?url=${arguments2[0].includes("://")?'':'https://'}${arguments2[0]}`);

    message.channel.send({
      embeds: [embed],
    });
  }
};