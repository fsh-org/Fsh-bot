const Discord = require("discord.js");

module.exports = {
  name: "daily",
  info: "Get daily amount of fsh",

  
  category: "hidden",
  async execute(message, arguments2, fsh) {
    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    if (!typeof Number(user) == "Number") return;
    user = fsh.client.users.cache.get(user) || message.author;
    let embed = new Discord.EmbedBuilder()
      .setTitle(`Balance of ${user.username}`)
      .setDescription(
        `${fsh.emojis.net} \`${fsh.user_fsh.get(user.id)}\` fsh in net\n${
          fsh.emojis.tank
        } \`${fsh.bank_fsh.get(user.id) || 0}\` fsh in tank`
      )
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL({ format: "png" }),
      })
      .setColor("#888888");
    message.channel.send({
      embeds: [embed],
    });
  },
};