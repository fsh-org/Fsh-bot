const Discord = require("discord.js");

module.exports = {
  name: ['http', 'httpcode'],
  params: ['code', false],
  info: "Get info on a http code",
  category: "utility",

  async execute(message, arguments2, fsh) {
    let data = await fetch('https://api.fsh.plus/http'+(arguments2[0] ? '?code='+arguments2[0] : ''));
    data = await data.json();
    if (data.err) {
      message.reply('could not get data');
      return;
    }
    message.channel.send(`${data.title} (${data.code})
type: ${data.type}
standard: ${data.standard}`)
  }
};