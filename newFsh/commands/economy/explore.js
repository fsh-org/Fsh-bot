const Discord = require("discord.js");

module.exports = {
  name: "explore",
  params: ['location', false],
  info: "Info on command",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    // temp dev only //
    if (!fsh.devIds.includes(message.author.id)) return;
    // ------------- //
    if (!arguments2[0]) {
      message.channel.send(`locations:
- temp`)
    }

    let lootable = {
      temp: ['', 'dev']
    }

    if (!Object.keys(lootable).includes(arguments2[0])) {
      message.reply('location does not exist')
    }

    message.channel.send('hmmm')
  }
};