const Discord = require("discord.js");

module.exports = {
  name: "uwuify",
  params: ['text', true],
  info: "UwU~ify your text :3",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let data = await fetch('https://api.fsh.plus/uwuify?text='+message.content.split(' ').slice(1,message.content.split(' ').length).join(' '));
    data = await data.json();

    message.channel.send(`result: ${data.text}`)
  }
};