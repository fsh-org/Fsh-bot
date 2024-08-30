const Discord = require("discord.js");

module.exports = {
  name: "ask",
  params: ['question', true],
  info: "Ask fsh anything (AI)",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    message.channel.sendTyping()
    /*let data = await fetch("https://reverse.mubi.tech/v1/chat/completions", {
      "headers": {
        "content-type": "application/json",
      },
      "body": `{"model":"llama-2-7b","messages":[{"role":"user","content":"${encodeURIComponent(arguments2.join("%20"))}"}]}`,
      "method": "POST"
    });*/
    let data = await fetch(`https://api.fsh.plus/generate?text=<start_of_turn>user
${encodeURIComponent(arguments2.join("%20"))}<end_of_turn>
<start_of_turn>model`);
    if (!String(data.status).startsWith("2")) {
      message.reply("ai not available")
      return;
    }
    data = await data.json();
    data = await fetch(`https://api.fsh.plus/generate?text=`+encodeURIComponent(data.generated_text));
    data = await data.json();
    
    message.reply(`${fsh.emojis.ai} Response:
${data.generated_text.split('<start_of_turn>model')[1]}`)
  }
};