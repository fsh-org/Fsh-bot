const Discord = require("discord.js");

module.exports = {
  name: "ask",
  params: ['question', true],
  info: "Ask fsh anything (AI)",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    let data = await fetch(`https://api.fsh.plus/generate?text=<start_of_turn>user
${arguments2.join("%20")}<end_of_turn>
<start_of_turn>model`);
        if (!String(data.status).startsWith("2")) {
          message.reply("Ai not available")
          return;
        }
        data = await data.json();

        message.reply(`${fsh.emojis.ai} ${fsh.emojis.alpha} Response:
${data.generated_text.split('<start_of_turn>model')[1]}`)
  }
};