const Discord = require("discord.js");

module.exports = {
  name: "play",
  params: [],
  info: "Info on command",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    // temp dev only //
    if (!fsh.devIds.includes(message.author.id)) return;
    // ------------- //
    if (!message.member.voice?.channel) return message.channel.send('Connect to a Voice Channel');
    if (!arguments2.length) return message.channel.send('Send a song to play')
      fsh.music.play(message, message.member.voice.channel, arguments2.join(' '))
    
  }
};