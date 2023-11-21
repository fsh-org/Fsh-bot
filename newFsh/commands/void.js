/* This is a easter egg
don't ruin the fun by looking at what it does in code
just use the file name as a hint
*/

const Discord = require("discord.js");

module.exports = {
  name: "void",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    message.channel.send('"If you gaze into the abyss for long\nthe abyss will gaze back into you"\n                 \\- Friedrich Nietzsche')
  }
};