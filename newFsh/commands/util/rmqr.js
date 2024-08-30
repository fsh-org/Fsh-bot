const Discord = require("discord.js");

module.exports = {
  name: ['rmqr','longqr'],
  params: ['text', true],
  info: "Creates a rmqr from text",
  category: "utility",

  async execute(message, arguments2, fsh) {
    let letext = await fetch(`https://api.fsh.plus/filter?text=${arguments2.join(" ").replaceAll("`","ˋ").replaceAll('\n',' [new line] ')}&char=*`);
    letext = await letext.json();
    letext = await letext.censor;
    if (letext.length > 150) {
      message.reply(`message must be less than 150 in length (${letext.length})`)
      return;
    }

    let q = await fetch(`https://api.fsh.plus/rmqr?text=${letext}`)
    q = await q.json();

    const attachment = new Discord.AttachmentBuilder(Buffer.from(q.image.split(',')[1], 'base64'), { name: 'rmqr.png' });

    message.reply({
      files: [attachment]
    })
  }
};