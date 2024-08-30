const Discord = require("discord.js");

module.exports = {
  name: "question",
  info: "Responds with random question",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let data = await fetch("https://poopoo-api.vercel.app/api/qotd")
    data = await data.json();
    if (arguments2[0] == "-c") {
      message.channel.send(`Question:\n${data.question}`);
    } else {
      message.channel.send(`Question:\n${data.question}\n(note: don't respond, add "-c" to remove this message)`);
    }
  }
};