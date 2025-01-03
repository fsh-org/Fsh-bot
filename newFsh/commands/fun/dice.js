const Discord = require("discord.js");

module.exports = {
  name: "dice",
  slash: true,
  params: [{
    name: 'sides',
    type: 'number',
    min: 1,
    max: 420000,
    required: false
  }],
  category: "fun",

  async execute(interaction, arguments, fsh) {
    let inner = fsh.getInnerLocale(interaction);
    let sides = Number(arguments['sides']) || 6;
    let rs = Math.floor(Math.random() * sides + 1);

    interaction.reply(`${inner.rolled1} ${sides} ${inner.rolled2} ${rs}`)
  }
};