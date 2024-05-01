const Discord = require("discord.js");

module.exports = {
  name: "puny",
  params: ['text', true],
  info: "Convert domain into punycode",
  category: "utility",

  async execute(message, arguments2, fsh) {
    let data = await fetch('https://api.fsh.plus/puny?domain='+arguments2.join(' '));
    try {
      data = await data.json();
    } catch (err) {
      message.reply('could not get')
    }

    message.channel.send('punycode: '+data.puny)
  }
};