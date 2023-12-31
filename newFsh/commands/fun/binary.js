const Discord = require("discord.js");

module.exports = {
  name: ['binary','bin', '2'],
  params: ['type (encode/decode)', true, 'text', true],
  info: "Encode & Decode binary",
  category: "fun",

  async execute(message, arguments2, fsh) {
    arguments2 = message.content.split(' ');
    arguments2 = arguments2.slice(1, arguments2.length);
    if (!arguments2[1]) {
      message.reply('you must fill everything');
      return;
    }
    let data = await fetch('https://api.fsh.plus/binary?type='+arguments2[0]+'&text='+arguments2.slice(1,arguments2.length).join('%20'));
    try {
      data = await data.json();
    } catch (err) {
      message.reply('could not do')
      return;
    }

    message.channel.send(`result:
\`\`\`
${data.text || data.msg}
\`\`\``)
  }
};