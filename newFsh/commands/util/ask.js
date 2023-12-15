const Discord = require("discord.js");

module.exports = {
  name: "ask",
  params: ['question', true],
  info: "Ask fsh anything (AI)",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    let data = await fetch(`https://hercai.onrender.com/v3-beta/hercai?question=
[my name=${message.member.displayName}, my id=${message.author.id}, you are=Fsh, to mention="@user-id"]
${arguments2.join("%20")}`);
    data = await data.json();

    //console.log(data.reply)
    let fil = await fetch(`https://api.fsh.plus/filter?text=${data.reply}`)
    fil = await fil.json();
    //console.log(fil.censor)
    fil = fil.censor;
    fil = fil.replaceAll(/(?<!<)@[0-9 &]{1,20}/g, function(match){return `<${match}>`})
    
    message.reply(`${fsh.emojis.ai}${fsh.emojis.alpha} Response:
${fil}`)
  }
};