const Discord = require("discord.js");
const { useMainPlayer, useQueue } = require("discord-player");

module.exports = {
  name: "play",
  params: ['song', true],
  info: "Play a song in a vc",
  category: "music",

  async execute(message, arguments2, fsh) {
    if (fsh.music.checkVoice(message)) return;
    let queue = useQueue(message.guild.id);
    if (fsh.music.checkSameVoice(message, queue)) return;
    let player = useMainPlayer();
    if (!arguments2.length) return message.channel.send('send a song to play')
    player.play(message.member.voice.channel, message.content.split(' ').slice(1,message.content.split(' ').length).join(' '), {
      nodeOptions: {
        metadata: {
          text: message.channel,
          voice: message.member.voice.channel
        }
      }
    })
  }
}