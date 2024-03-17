const Discord = require("discord.js");

module.exports = {
  name: "queue",
  params: [],
  info: "Current music queue",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    if (!message.member.voice?.channel) return message.channel.send('connect to a Voice Channel');
    message.channel.send(fsh.music.userQueue.get(message.guild.id).length ? '**queue:**\n1. '+fsh.music.userQueue.get(message.guild.id).join('\n1. ') : 'Nothing in queue')
  }
}