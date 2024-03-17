const Discord = require("discord.js");

module.exports = {
  name: "pause",
  params: [],
  info: "Pauses or unpauses the current song",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    if (!message.member.voice?.channel) return message.channel.send('connect to a Voice Channel');
    if (fsh.music.paused.get(message.guild.id)) {
      fsh.music.unpause(message.guild.id)
    } else {
      fsh.music.pause(message.guild.id)
    }
  }
}