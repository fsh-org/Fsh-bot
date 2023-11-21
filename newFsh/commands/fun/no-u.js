const Discord = require("discord.js");

module.exports = {
  name: "no-u",
  params: ['user', true],
  info: "No u a user",
  category: "fun",
  async execute(message, arguments2, fsh) {
    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    if (!typeof Number(user) == "Number") {
      message.channel.send("mention someone");
      return;
    }
    message.delete()
    if (["816691475844694047","1068572316986003466","712342308565024818"].includes(user)) {
      user = message.member.id
    }
    message.channel.send(`<@${user}> no u\n||This action was performed by a user||`)
  }
};
