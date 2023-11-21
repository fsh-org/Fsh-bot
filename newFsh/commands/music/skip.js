const Discord = require("discord.js");

module.exports = {
  name: "skip",
  params: [],
  info: "Info on command",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    // temp dev only //
    if (!fsh.devIds.includes(message.author.id)) return;
    // ------------- //
    if (!message.member.voice?.channel) return message.channel.send('Connect to a Voice Channel');
      fsh.music.skip(message.guild.id)
    
  }
};