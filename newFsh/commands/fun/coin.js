const Discord = require("discord.js");

module.exports = {
  name: "coin",
  slash: true,
  category: "fun",

  async execute(interaction, arguments, fsh) {
    let inner = fsh.getInnerLocale(interaction);
    interaction.reply(`${inner.got} ${inner[Math.random()<0.5?'head':'tail']}`)
  }
};