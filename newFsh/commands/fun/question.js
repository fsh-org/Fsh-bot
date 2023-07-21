const Discord = require("discord.js");
const https = require("https");

module.exports = {
  name: "question",
  info: "Responds with random question",
  category: "fun",
  async execute(message, arguments2, fsh) {
    https.get("https://poopoo-api.vercel.app/api/qotd", async (resp) => {
      let data2 = "";
      resp.on("data", async (chunk) => {
        data2 += chunk;
      });
      resp.on("end", async () => {
        let data = JSON.parse(data2);
        if (arguments2[0] == "-c") {
          message.channel.send(`Question:\n${data.question}`);
        } else {
          message.channel.send(
            `Question:\n${data.question}\n(note: don't actually respond it won't do anything, add "-c" in command to remove this message)`
          );
        }
      });
    });
  },
};
