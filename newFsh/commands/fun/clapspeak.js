const Discord = require("discord.js");

module.exports = {
  name: "clapspeak",
  params: ['text', true],
  info: "Turn text into clap speak",
  category: "fun",

  async execute(message, arguments2, fsh) {
    message.channel.send(`requested: <@${message.author.id}>
${arguments2.filter(e=>e.length).map(e=>e.toUpperCase()).join(' :clap: ')}`.slice(0,2000))
  }
};