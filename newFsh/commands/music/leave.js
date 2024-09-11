const Discord = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  name: ["leave", "stop"],
  params: [],
  info: "Stop the music and make the bot leave",
  category: "music",

  async execute(message, arguments2, fsh) {
    if (fsh.music.checkVoice(message)) return;
    let queue = useQueue(message.guild.id);
    if (fsh.music.checkQueue(message, queue)) return;
    if (fsh.music.checkSameVoice(message, queue)) return;
    if (!queue.deleted) {
      queue.delete();
      message.reply('left');
    }
  }
}