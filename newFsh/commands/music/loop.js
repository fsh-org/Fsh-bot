const Discord = require("discord.js");

module.exports = {
  name: "loop",
  params: [],
  info: "Set the current song to loop or not",
  category: "music",

  async execute(message, arguments2, fsh) {
    if (!message.member.voice?.channel) return message.channel.send('connect to a Voice Channel');
    if (fsh.music.looped.get(message.guild.id)) {
      fsh.music.unloop(message.guild.id)
    } else {
      fsh.music.loop(message.guild.id)
    }
  }
}