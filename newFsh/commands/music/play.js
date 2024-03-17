const Discord = require("discord.js");

module.exports = {
  name: "play",
  params: [],
  info: "Play a song in a vc",
  category: "music",

  async execute(message, arguments2, fsh) {
    if (!message.member.voice?.channel) return message.channel.send('connect to a Voice Channel');
    if (!arguments2.length) return message.channel.send('send a song to play')
    fsh.music.play(message, message.member.voice.channel, arguments2.join(' '))
  }
}