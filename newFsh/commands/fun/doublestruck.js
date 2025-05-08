const Discord = require("discord.js");

module.exports = {
  name: "doublestruck",
  params: ['text', true],
  info: "Make text into double struck unicode text",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let letext = await fetch(`https://api.fsh.plus/filter?text=${arguments2.join(" ").replaceAll("`","ˋ").replaceAll('\n','\\n')}&char=*`);
    letext = await letext.json();
    letext = await letext.censor;
    if (letext.length > 2000) {
      message.reply(`message must be less than 2000 in length (${letext.length})`);
      return;
    }

    let data = await fetch('https://api.fsh.plus/doublestruck?text='+letext);
    data = await data.json();

    message.reply(`Doublestruck text:\n
${data.text}`);
  }
};