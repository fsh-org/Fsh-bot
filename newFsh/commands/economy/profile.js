const Discord = require("discord.js");

function textToTitleCase(str) {
  return str.replace(/\S+/g, function (txt) {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase();
  });
}

module.exports = {
  name: "profile",
  params: ["member", false],
  info: "Shows the economy profile of someone",

  category: "economy",
  async execute(message, arguments2, fsh) {
    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    if (!typeof Number(user) == "Number") return;
    user = fsh.client.users.cache.get(user) || message.author;
    let badges = [];
    let badge = fsh.user_badges.get(user.id) || [];

    badge.forEach((badg) => {
      badges.push(`${fsh.emojis[badg.emoji]} ${badg.name}`);
    });
    try {
      if (fsh.client.guilds.cache.get('866689038731313193').members.cache.get(user.id)._roles.includes("1167912910568296520")) {
        badges.push(`*:gem: S4D VIP*`)
      }
    } catch (err) {
      // No err
    }

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${textToTitleCase(user.displayName)}'${user.displayName.endsWith('s') ? "" : "s"} economy profile`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setThumbnail(user.displayAvatarURL({ format: "png" }))
      .setColor("#888888")
      .setDescription(
        `${badges.join(" ")}

${fsh.emojis.net} **${fsh.user_fsh.get(user.id) || 0}** in net  |  ${
          fsh.emojis.tank
        } **${
          fsh.bank_fsh.get(user.id) || 0
        }** in tank
        (\`fsh!bal\` for more info)`
      )
      .addFields({
        name: `Inventory`,
        value: `**Pending feature**`,
      });
    message.channel.send({
      embeds: [embed],
    });
  },
};
