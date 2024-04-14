const Discord = require("discord.js");

module.exports = {
  name: "shorten",
  params: ["url", true],
  info: "Make urls short with fsh link",
  category: "utility",

  async execute(message, arguments2, fsh) {
    let d = await fetch('https://link.fsh.plus/create?url='+encodeURIComponent(arguments2[0]))
    d = await d.json();
    if (d.url) {
      message.reply(`new url: <${d.url}>`)
    } else {
      message.reply('could not create')
    }
  }
};