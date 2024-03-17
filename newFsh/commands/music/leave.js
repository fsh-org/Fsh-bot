const Discord = require("discord.js");

module.exports = {
  name: ["leave", "stop"],
  params: [],
  info: "Stop the music and make the bot leave",
  category: "music",

  async execute(message, arguments2, fsh) {
    if (!message.member.voice?.channel) return message.channel.send('connect to a Voice Channel');
    fsh.music.leave(message.guild.id)
  }
}