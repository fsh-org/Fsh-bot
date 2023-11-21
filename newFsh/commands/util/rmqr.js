const Discord = require("discord.js");

function gEt(x,y,z) {
  return x.split("\n").slice(y,z)
}

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

    let q = await fetch(`https://asia-northeast1-rmqr-generator.cloudfunctions.net/generate-rmqr-code`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: letext,
        versionStrategy: "minimize_width",
        errorCorrectionLevel: "auto"
      })
    })
    q = await q.json();
    
    let y = JSON.stringify(q.qr);
    
    y = y.replaceAll(/\[|(?<!\]),|\](?!,)/g, "").replaceAll("],","\n");

    y = y
      .split("\n")
      .slice(1,q.height-1)
      .join("\n")
      .slice(1,-1)
      .replaceAll("\n00","\n0")
      .replaceAll("00\n","0\n");
    
    y = y.replaceAll("1",`⬛`).replaceAll("0",`⬜`);
    
    message.reply(y.split("\n").slice(0,5).join("\n"))
    if (gEt(y,5,10).length < 1) return;
    message.channel.send(gEt(y,5,10).join("\n"))
    if (gEt(y,10,15).length < 1) return;
    message.channel.send(gEt(y,10,15).join("\n"))
    if (gEt(y,15,20).length < 1) return;
    message.channel.send(gEt(y,15,20).join("\n"))
    if (gEt(y,20,25).length < 1) return;
    message.channel.send(gEt(y,20,25).join("\n"))
    
  }
};