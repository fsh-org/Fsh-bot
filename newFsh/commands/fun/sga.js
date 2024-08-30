const Discord = require("discord.js");

let n = 'q,w,e,r,t,y,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m'.split(',');
let g = 'ᑑ,∴,ᒷ,∷,ℸ ̣,|\\|,||,⚍,╎,𝙹,!¡,ᔑ,ᓭ,↸,⎓,⊣,⍑,⋮,ꖌ,ꖎ,⨅, ̇/,ᓵ,⍊,ʖ,リ,ᒲ'.split(',');

module.exports = {
  name: ['sga','galactic-alphabet','enchanting-table'],
  params: ['encode/decode', true, 'message', true],
  info: "Translate to or back of the Standard Galactic Alphabet",
  category: "fun",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply('include encode or decode')
      return;
    }
    let act = arguments2[0];
    arguments2 = arguments2.slice(1, arguments2.length).join(' ').toLowerCase();
    switch (act) {
      case 'encode':
        for (let i = 0; i < n.length; i++) {
          arguments2 = arguments2.replaceAll(n[i], g[i])
        }
        message.channel.send(`requested by: <@${message.author.id}>
translation: ${arguments2}`)
        break;
      case 'decode':
        for (let i = 0; i < n.length; i++) {
          arguments2 = arguments2.replaceAll(g[i], n[i])
        }
        message.channel.send(`requested by: <@${message.author.id}>
translation: ${arguments2}`)
        break;
      default:
        message.reply('include encode or decode')
        break;
    }
  }
};