const Discord = require("discord.js");

module.exports = {
  name: "coin",
  info: "Flip a coin",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let a = "";
    if (Math.random()<0.5) {
      a = "Heads"
    } else {
      a = "Tails"
    }
    message.reply(`Flipped a coin :coin:, got ${a}`)
  }
};