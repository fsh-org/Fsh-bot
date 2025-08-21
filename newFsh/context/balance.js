const Discord = require("discord.js");

function textToTitleCase(str) {
  return str.replace(/\S+/g, function (txt) {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase();
  });
}

module.exports = {
  name: "balance",
  usage: "user",
  info: "Amount of fsh that someone has",

  async execute(fsh, interaction) {
    let user = interaction.targetUser;

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${textToTitleCase(user.displayName)}'${user.displayName.endsWith('s') ? "" : "s"} economy profile`)
      .setDescription(
        `${fsh.emojis.net} \`${fsh.user_fsh.get(user.id) || 0}\` fsh in net
${fsh.emojis.tank} \`${fsh.bank_fsh.get(user.id) || 0}/${fsh.bank_limit.get(user.id) || 1000}\` fsh in tank

${fsh.emojis.fsh} \`${(fsh.user_fsh.get(user.id) || 0) + (fsh.bank_fsh.get(user.id) || 0)}\` total fsh`
      )
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setThumbnail(user.displayAvatarURL({ format: "png" }))
      .setColor("#888888");

    interaction.reply({
      embeds: [embed]
    });
  }
};