const Discord = require("discord.js");
const Mexp = require("math-expression-evaluator");

function edr(er,tr) {
  if (er == 0) {
    return '';
  } else {
    return er+' '+tr+(er>1?'s':'')+' '
  }
}

function time_gud(time) {
  return `${edr(Math.floor(time / 31536000000),'millennium')}${edr(Math.floor(time / 31536000 % 1000),'year')}${edr(Math.floor(time % 31536000 / 604800),'week')}${edr(Math.floor(time / 86400) % 7,'day')}${edr(Math.floor(time / 3600) % 24,'hour')}${edr(Math.floor(time / 60) % 60,'minute')}${edr(time % 60,'second')}`
}

module.exports = {
  name: "math",
  params: ['expression', true],
  info: "Resolves a math expression",
  category: "utility",

  async execute(message, arguments2, fsh) {
    const mexp = new Mexp()

    let res;
    try {
      res = String(mexp.eval(arguments2.join(" ").replaceAll('**','^')));
    } catch (err) {
      res = 'invalid expression'
    }

    if (res == 'invalid expression' || res == 'Infinity') {
      message.reply(`**Math result:**
\`\`\`
${res}
\`\`\``);
      return;
    }

    let data;
    try {
      data = await fetch("https://api.fsh.plus/unit?number="+res);
      data = await data.json();
    } catch (err) {
      data = {
        number: 'No',
        short: ' short',
        long: ' `:(` '
      }
    }

    message.reply(`**Math result:**
\`\`\`
${res}
\`\`\`**Short:** ${data.number}${data.short} ${data.long ? `(${data.long})` : ''}
**Time:** ${time_gud(res)}`)
  }
};