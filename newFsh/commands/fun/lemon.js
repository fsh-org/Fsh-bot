const fs = require("fs");

module.exports = {
  name: "lemon",
  params: ["user", true],
  info: "Lemon a user",
  category: "fun",

  async execute(message, arguments, fsh) {
    if (message.mentions.users != null && message.mentions.users.size > 0) {
      if (fsh.cooldown.has(message.author.id + "-lemon")) {
        if (Math.floor(new Date().getTime() / 1000) < fsh.cooldown.get(message.author.id + "-lemon") + 3600) {
          message.channel.send(`you will be able to lemon again <t:${fsh.cooldown.get(message.author.id + "-lemon") + 3600}:R>`);
          return;
        }
      }
      message.mentions.members.first().send(
        fs
          .readFileSync("text/lemon.txt", "utf8")
          .replaceAll("{a}", message.author.username)
      );
      message.reply("lemon sent");
      fsh.cooldown.set(message.author.id + "-lemon", Math.floor(new Date().getTime() / 1000));
    } else {
      message.reply("you need to mention someone");
    }
  }
};