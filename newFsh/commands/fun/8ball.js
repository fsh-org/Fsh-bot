const Discord = require("discord.js");

module.exports = {
  name: '8ball',
  slash: true,
  params: [{
    name: 'query',
    type: 'string',
    max: 200,
    required: false
  }],
  category: 'fun',

  async execute(interaction, arguments, fsh) {
    let inner = fsh.getInnerLocale(interaction);
    interaction.reply(`:8ball: ${inner[Math.floor(Math.random() * 16)]}`);
  }
};