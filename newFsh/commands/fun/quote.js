const Discord = require("discord.js");

module.exports = {
  name: "quote",
  info: "Get random quote",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let data = await fetch(`https://zenquotes.io/api/random`);
    data = await data.json()
    message.reply(`"${data[0].q}"
        \\- ${data[0].a}`)
  }
};