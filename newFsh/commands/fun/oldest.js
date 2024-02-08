const Discord = require("discord.js");

module.exports = {
  name: "oldest",
  info: "Info on command",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    let news = {};
    message.guild.members.cache.forEach(async m => {
      news[m.user.id] = m.joinedAt;
    })
    let snew = [];
    for (var i in news) {
    snew.push([i, news[i]]);
    }

    snew.sort(function(a, b) {
    return a[1] - b[1];
    });

    message.reply(snew[0])
  }
};