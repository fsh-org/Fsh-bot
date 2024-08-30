const Discord = require("discord.js");

module.exports = {
  name: "favicon",
  params: ['url', true],
  info: "Get the favicon of a website",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let url = arguments2[0];
    if (!url.includes('://')) url = 'https://'+url;
    if (!url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
      message.reply('not a valid url')
    }

    let embed = new Discord.EmbedBuilder()
      .setTitle(`Favicon of "${url.split('://')[1].split('/')[0]}"`)
      .setImage('https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=256&url='+url)
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888");

    message.channel.send({
      embeds: [embed]
    })
  }
};