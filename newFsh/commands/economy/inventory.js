const Discord = require("discord.js");

module.exports = {
  name: ["inventory", "inv"],
  params: ['user', false],
  info: "View your or others items",
  category: "economy",

  async execute(message, arguments2, fsh) {
    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    user = fsh.client.users.cache.get(user) || message.author;

    let inv = fsh.user_inventory.get(user.id) || {};

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.economy} Inventory of ${user.globalName || user.username}`)
      .setDescription(Object.keys(inv).map(e => {
        return `- ${inv[e]}x ${fsh.items.get(e).name} ${fsh.emojis[fsh.items.get(e).emoji] || ''}
  - ${fsh.items.get(e).desc}`
      }).join('\n') || 'No items')
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setThumbnail(user.displayAvatarURL({ format: "png" }))
      .setColor("#888888");

    message.channel.send({
      embeds: [embed]
    })
  }
};