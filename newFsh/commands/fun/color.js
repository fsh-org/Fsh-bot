const Discord = require("discord.js");

module.exports = {
  name: "color",
  params: ['hex', true],
  info: "Info on command",
  category: "fun",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply('include a hex color')
      return;
    }
    let data = await fetch('https://api.fsh.plus/color?hex='+arguments2[0].replace('#',''));
    data = await data.json();

    if (data.err) {
      message.reply('could not get')
      return;
    }

    let embed = new Discord.EmbedBuilder()
      .setTitle(data.name)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor('#888888')
      .setDescription(data.hex)
      .setThumbnail(data.preview);

    try {
      embed.setColor(data.hex.slice(0,7))
    } catch(err) {
      // no
    }

    message.channel.send({
      embeds: [embed]
    })
  }
};