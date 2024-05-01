const Discord = require("discord.js");

function textToUnicode(text) {
  let unicodeArray = [];
  for (let i = 0; i < text.length; i++) {
    unicodeArray.push(text.charCodeAt(i));
  }
  return unicodeArray;
}

module.exports = {
  name: "unicode",
  params: ['text', true],
  info: "Get the unicode values of text",
  category: "utility",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply('you must include text to include')
      return;
    }
    let uni = textToUnicode(message.content.split(' ').slice(1, message.content.split(' ').length).join(' '));
    message.channel.send(`unicode
> hex: \\u${uni.map(e=>e.toString(16).toUpperCase().padStart(4, '0')).join('\\u')}
> decimal: U+${uni.map(e=>e.toString().padStart(4, '0')).join('U+')}`)
  }
};