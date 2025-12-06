const Discord = require("discord.js");

module.exports = {
  name: "fandom",
  params: ['url', true],
  info: "Shows the contents of a fandom wiki page",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    let data = await fetch("https://api.fsh.plus/fandom?discord=true&url="+message.content.split(' ')[1])
    data = await data.text();
    let image = await fetch(`https://api.fsh.plus/fandom-image?url=${message.content.split(' ')[1]}`)
    image = await image.json();

    try {
      let embed = new Discord.EmbedBuilder()
        .setTitle(`Wiki ${message.content.split(' ')[1].split(".fan")[0].split("://").slice(-1)[0]} "${message.content.split(' ')[1].split("wiki/")[1]}"`)
        .setFooter({ text: `V${fsh.version}` })
        .setTimestamp(new Date())
        .setColor('#888888')
        .setDescription(data.length > 4050 ? data.slice(0,4050)+"\n\n**Page to big, go to link for full page**" : data);

      if (image.image) embed.setThumbnail(image.image);

      message.channel.send({
        embeds: [embed]
      });
    } catch {
      message.reply('error sending');
    }
  }
};