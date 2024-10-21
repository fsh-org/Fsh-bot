const Discord = require("discord.js");
const { useQueue, useTimeline } = require("discord-player");

module.exports = {
  name: "volume",
  params: ['volume', false],
  info: "Changes the volume of the song",
  category: "music",

  async execute(message, arguments2, fsh) {
    if (fsh.music.checkVoice(message)) return;
    let queue = useQueue(message.guild.id);
    if (fsh.music.checkQueue(message, queue)) return;
    if (fsh.music.checkSameVoice(message, queue)) return;
    let { volume, setVolume } = useTimeline(message.guild.id);
    let num = Number(arguments2[0]);
    if (!isNaN(num)) {
      if (num < 0) {
        message.reply('must be a positive integer')
        return;
      }
      if (num > 1000) {
        message.reply('a bit too loud keep it under 1000')
        return;
      }
      queue.node.setVolume(num);
    } else {
      message.channel.send('current volume: '+volume)
    }
  }
}