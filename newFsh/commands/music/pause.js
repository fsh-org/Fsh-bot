const Discord = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  name: ["pause", "resume"],
  params: [],
  info: "Pause or resume the current queue",
  category: "music",

  async execute(message, arguments2, fsh) {
    if (fsh.music.checkVoice(message)) return;
    let queue = useQueue(message.guild.id);
    if (fsh.music.checkQueue(message, queue)) return;
    if (fsh.music.checkSameVoice(message, queue)) return;
    let state = (!queue.node.isPaused());
    queue.node.setPaused(state);
    message.reply((state ? 'paused' : 'resumed')+' queue')
  }
}