const Discord = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
  name: 'queue',
  params: [],
  info: 'Get the Current music queue',
  category: 'music',

  async execute(message, arguments2, fsh) {
    if (fsh.music.checkVoice(message)) return;
    let queue = useQueue(message.guild.id);
    if (fsh.music.checkSameVoice(message, queue)) return;
    if (!queue) {
      message.reply('no queue in this server');
      return;
    }
    message.channel.send(queue.tracks.data.length ? '**queue:**\n'+queue.tracks.data.map(t=>`1. ${t.title} by ${t.author}`).join('\n') : 'nothing in queue');
  }
}