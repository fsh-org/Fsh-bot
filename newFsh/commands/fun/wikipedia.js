const Discord = require("discord.js");

module.exports = {
  name: ['wp', 'wikipedia'],
  params: ['page', true],
  info: "View a wikipedia page",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let data = await fetch('https://api.fsh.plus/wikipedia?page='+arguments2.join('%20'));
    data = await data.json();

    let embed = new Discord.EmbedBuilder()
      .setTitle(`Wikipedia "${data.title}"`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor('#888888')
      .setDescription(data.data.slice(0, 3092)+'... Read full on [wikipedia](https://en.wikipedia.com/wiki/'+data.title.replaceAll(' ', '_')+')');

    if (data.img.length) {
      embed.setThumbnail(data.img);
    }

    message.channel.send({
      embeds: [embed]
    })
  }
};