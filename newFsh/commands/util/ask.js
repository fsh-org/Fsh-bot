const Discord = require("discord.js");

module.exports = {
  name: "ask",
  params: ['question', true],
  info: "Ask fsh anything (AI)",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    message.channel.sendTyping();
    /*let data = await fetch("https://reverse.mubi.tech/v1/chat/completions", {
      "headers": {
        "content-type": "application/json",
      },
      "body": `{"model":"llama-2-7b","messages":[{"role":"user","content":"${encodeURIComponent(arguments2.join("%20"))}"}]}`,
      "method": "POST"
    });*/
    let data = await fetch(`https://api.fsh.plus/generate?text=<start_of_turn>user%0A${encodeURIComponent(arguments2.join("%20"))}<end_of_turn>%0A<start_of_turn>model`);
    if ((!String(data.status).startsWith("2")) || data.err) {
      message.reply("ai not available")
      return;
    }
    data = await data.json();
    message.channel.sendTyping();
    let data2 = await fetch(`https://api.fsh.plus/generate?text=`+encodeURIComponent(data.generated_text));
    if ((!String(data.status).startsWith("2")) || data.err) {
      message.reply(`${fsh.emojis.ai} Response:
${data.generated_text.split('<start_of_turn>model')[1]}`)
      return;
    }
    data = await data.json();

    message.reply(`${fsh.emojis.ai} Response:
${data2.generated_text.split('<start_of_turn>model')[1]}`)
  }
};