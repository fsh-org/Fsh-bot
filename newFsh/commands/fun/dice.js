const Discord = require("discord.js");

module.exports = {
  name: ['dice', 'die'],
  params: ['sides', false],
  info: "Throw a dice",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let sides = 6
    if (String(Number(arguments2[0])) != "NaN") {
      sides = Math.max(Number(arguments2[0]), 1)
    }
    let rs = Math.floor(Math.random() * sides + 1);

    message.reply(`Rolled a dice :game_die: with ${sides} sides, got ${rs}`)
  }
};