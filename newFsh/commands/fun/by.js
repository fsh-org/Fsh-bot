const Discord = require("discord.js");

module.exports = {
  name: "bypass",
  //params: [],
  info: "Info on command",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    message.reply(`\`\`\`\n${arguments2.join(" ")}\n\`\`\``)
  }
};