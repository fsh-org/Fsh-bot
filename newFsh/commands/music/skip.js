const Discord = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  name: "skip",
  params: [],
  info: "Skips the current song",
  category: "music",

  async execute(message, arguments2, fsh) {
    if (fsh.music.checkVoice(message)) return;
    let queue = useQueue(message.guild.id);
    if (fsh.music.checkQueue(message, queue)) return;
    if (fsh.music.checkSameVoice(message, queue)) return;
    queue.node.skip();
  }
}