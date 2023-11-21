const Discord = require("discord.js");

function textToTitleCase(str) {
  return str.replace(/\S+/g, function (txt) {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase();
  });
}

module.exports = {
  name: ["amount", "balance", "bal"],
  params: ["member", false],
  info: "Amount of fsh that someone has",

  category: "economy",
  async execute(message, arguments2, fsh) {
    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    if (!typeof Number(user) == "Number") return;
    user = fsh.client.users.cache.get(user) || message.author;
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${textToTitleCase(user.displayName)}'${user.displayName.endsWith('s') ? "" : "s"} economy profile`)
      .setDescription(
        `${fsh.emojis.net} \`${fsh.user_fsh.get(user.id) || 0}\` fsh in net
${fsh.emojis.tank} \`${fsh.bank_fsh.get(user.id) || 0}/${fsh.bank_limit.get(user.id) || 1000}\` fsh in tank
        
${fsh.emojis.fsh} \`${
          (fsh.user_fsh.get(user.id) || 0) + (fsh.bank_fsh.get(user.id) || 0)
        }\` total fsh`
      )
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setThumbnail(user.displayAvatarURL({ format: "png" }))
      .setColor("#888888");
    message.channel.send({
      embeds: [embed],
    });
  }
};
