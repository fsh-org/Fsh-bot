const Discord = require('discord.js');
const { useQueue, QueueRepeatMode } = require('discord-player');

module.exports = {
  name: 'loop',
  params: ['mode', false],
  info: 'Set the current song loop mode',
  category: 'hidden',

  async execute(message, arguments2, fsh) {
    if (fsh.music.checkVoice(message)) return;
    let queue = useQueue(message.guild.id);
    if (fsh.music.checkQueue(message, queue)) return;
    if (fsh.music.checkSameVoice(message, queue)) return;
    if (!QueueRepeatMode['0']) Object.keys(QueueRepeatMode).forEach(k=>QueueRepeatMode[QueueRepeatMode[k]]=k);
    if (!arguments2[0]) {
      message.channel.send('current loop mode: '+ QueueRepeatMode[queue.repeatMode??0].toLowerCase())
    } else {
      if (!['off','queue','track'].includes(arguments2[0])) {
        message.reply('available loop modes: off, queue, and track');
        return;
      }
      let past = QueueRepeatMode[queue.repeatMode??0].toLowerCase();
      if (past === arguments2[0]) {
        message.reply('loop mode alredy is '+past);
        return;
      }
      queue.setRepeatMode(QueueRepeatMode[arguments2[0].toUpperCase()]);
      message.reply(`changed loop mode from ${past} to ${arguments2[0]}`);
    }
  }
}