const Discord = require("discord.js");
const Mexp = require("math-expression-evaluator");

function time_gud(time) {
  let edr = (er,tr)=>(er===0)?'':er+tr+' ';
  return `${edr(Math.floor(time / 31536000000),'millennium')}${edr(Math.floor(time / 31536000 % 1000),'year')}${edr(Math.floor(time % 31536000 / 604800),'week')}${edr(Math.floor(time / 86400) % 7,'day')}${edr(Math.floor(time / 3600) % 24,'hour')}${edr(Math.floor(time / 60) % 60,'minute')}${edr(time % 60,'second')}`
}

module.exports = {
  name: "math",
  slash: true,
  params: [{
    name: 'expression',
    type: 'string',
    required: true
  }],
  category: "utility",

  async execute(interaction, arguments, fsh) {
    let inner = fsh.getInnerLocale(interaction);

    // Evaluate
    const mexp = new Mexp()

    let res;
    let err = false;
    try {
      res = String(mexp.eval(arguments['expression'].replaceAll('**','^')));
    } catch (err) {
      err = true;
    }

    if (err || res === 'Infinity' || res === 'undefined' || (typeof res) === 'undefined') {
      if (res!=='Infinity') res = inner.errexpresion;
      interaction.reply(`**${inner.result}:**
\`\`\`
${res}
\`\`\``);
      return;
    }

    let data;
    let erro = false;
    try {
      data = await fetch(`https://api.fsh.plus/unit?number=${res}`);
      data = await data.json();
    } catch (err) {
      erro = true;
    }

    interaction.reply(`**${inner.result}:**
\`\`\`
${res}
\`\`\`**${inner.short}:** ${erro?inner.errshort:`${data.number}${data.short} ${data.long ? `(${data.long})` : ''}`}
**${inner.time}:** ${time_gud(res)}`)
  }
};