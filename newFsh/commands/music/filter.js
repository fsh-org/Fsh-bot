const Discord = require("discord.js");
const { useQueue, useTimeline } = require("discord-player");

module.exports = {
  name: "filter",
  params: [],
  info: "Adds a filter the song",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    if (true) return;
    if (fsh.music.checkVoice(message)) return;
    let queue = useQueue(message.guild.id);
    if (fsh.music.checkQueue(message, queue)) return;
    if (fsh.music.checkSameVoice(message, queue)) return;
    if (!queue.filters.ffmpeg) {
      message.reply('filters not available')
      return;
    }
    queue.filters.ffmpeg.setFilters(false);
    queue.filters.ffmpeg.toggle(arguments[0]);
  }
}