const Discord = require("discord.js");

module.exports = {
  name: "ask",
  params: ['question', true],
  info: "Ask fsh anything (AI)",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    message.channel.sendTyping();
    try {
      let a = await fetch('https://proxy.mubilop.tech/v1');
      a = await a.text();
      let data = await fetch("https://reverse.mubi.tech/v1/chat/completions", {
        "headers": {
          "content-type": "application/json",
        },
        "body": `{"model":"llama-2-7b","messages":[{"role":"user","content":"${encodeURIComponent(arguments2.join("%20"))}"}]}`,
        "method": "POST"
      });
      message.reply(`${fsh.emojis.ai} Response:
${data.choices[0].message.content}`);
    } catch(err) {
      let txt = '';
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
  }
};
/*
const Discord = require("discord.js");

module.exports = {
  name: "ask",
  params: ['question', true],
  info: "Ask fsh anything (AI)",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    message.channel.sendTyping();
    // Create agent
    let agent = await fetch('https://chat.deepseek.com/api/v0/chat_session/create', {
      method: 'POST',
      headers: {
        "authorization": "Bearer CgmDtXMkGmjmGQGFVuaQ3E1ds+ld59rJLsmxf2QYIfbKvbimwEdiUHQV0HMLfrfU",
        "content-type": "application/json",
        "x-app-version": "20241129.1",
        "x-client-locale": "en_US",
        "x-client-platform": "web",
        "x-client-version": "1.0.0-always"
      },
      body: '{"character_id":null}'
    });
    agent = await agent.json();
    let msg = await message.channel.send(`${fsh.emojis.ai} Response:
*Loading*`);
    let res = '';
    // Send
    fetch("https://chat.deepseek.com/api/v0/chat/completion", {
      method: "POST",
      headers: {
        "authorization": "Bearer CgmDtXMkGmjmGQGFVuaQ3E1ds+ld59rJLsmxf2QYIfbKvbimwEdiUHQV0HMLfrfU",
        "content-type": "application/json",
        "x-app-version": "20241129.1",
        "x-client-locale": "en_US",
        "x-client-platform": "web",
        "x-client-version": "1.0.0-always"
      },
      body: JSON.stringify({
        chat_session_id: agent.data.biz_data.id,
        prompt: arguments2.join(' '),
        thinking_enabled: false,
        search_enabled: false,
        parent_message_id: null,
        ref_file_ids: [],
      })
    })
      .then(async (response) => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            msg.edit(`${fsh.emojis.ai} Response:
${res}`);
            break;
          }
          let chunk = decoder.decode(value);
          let events = chunk.split('\n\n');
          for (let event of events) {
            if (event.trim() === '') continue;
            let data = event.replace(/^data: /, '').trim();
            res += JSON.parse(data).choices[0].delta.content;
          }
        }
      })
      .catch((err) => {
        msg.edit(`${fsh.emojis.ai} Response:
Could not generate a response.`);
        console.error('Error:', err);
      });
  }
};
*/