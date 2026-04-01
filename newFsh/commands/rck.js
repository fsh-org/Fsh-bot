/* This is a easter egg
don't ruin the fun by looking at what it does in code
just use the file name as a hint
*/

const Discord = require("discord.js");

module.exports = {
  name: "rck",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    if (fsh.user_badges.get(message.member.id).includes('rck26')) {
      message.reply('depleted');
    } else {
      fsh.user_badges.push(message.member.id, 'rck26');
      message.reply('you won one (1) free rck!');
    }
  }
};