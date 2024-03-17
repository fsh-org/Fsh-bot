const Discord = require("discord.js");

module.exports = {
  name: "8ball",
  params: ['query', false],
  info: "Let the 8ball respond",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let data = await fetch('https://api.fsh.plus/8ball');
    data = await data.json();

    message.reply(`:8ball: ${data.response}`)
  }
};