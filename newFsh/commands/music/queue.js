const Discord = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  name: "queue",
  params: [],
  info: "Get the Current music queue",
  category: "music",

  async execute(message, arguments2, fsh) {
    if (!message.member.voice?.channel) return message.channel.send('connect to a Voice Channel');
    let queue = useQueue(message.guild.id);
    if (!queue) {
      message.reply('no queue in this server');
    }
    message.channel.send(queue.tracks.data.length ? '**queue:**\n'+queue.tracks.data.map(t=>`1. ${t.title} by ${t.author}`).join('\n') : 'nothing in queue')
  }
}