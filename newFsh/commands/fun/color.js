const Discord = require("discord.js");

module.exports = {
  name: "color",
  params: ['hex', false],
  info: "Info on a color, empty for random",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let data = await fetch('https://api.fsh.plus/color?hex='+(arguments2[0]||'').replace('#',''));
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