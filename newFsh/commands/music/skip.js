const Discord = require("discord.js");

module.exports = {
  name: "skip",
  params: [],
  info: "Info on command",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    if (!message.member.voice?.channel) return message.channel.send('connect to a Voice Channel');
    fsh.music.skip(message.guild.id)
  }
}