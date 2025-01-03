const Discord = require("discord.js");

module.exports = {
  name: "no-u",
  params: ['user', true],
  info: "No u a user",
  category: "fun",

  async execute(message, arguments, fsh) {
    let user = (arguments[0]??'').replace(/<@/g, "").replace(/>/g, "");
    if (Number.isNaN(Number(user))) {
      message.reply("mention someone");
      return;
    }
    message.delete()
    if (fsh.devIds.includes(user)) {
      user = message.member.id
    }
    message.channel.send(`<@${user}> no u\n||This action was performed by a user||`)
  }
};