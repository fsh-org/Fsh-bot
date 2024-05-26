const Discord = require("discord.js");

module.exports = {
  name: "explore",
  params: ['location', false],
  info: "Info on command",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    // temp dev only //
    if (!fsh.devIds.includes(message.author.id)) return;
    // ------------- //

    let inv = fsh.user_inventory.get(user.id) || {};
    
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.economy} Inventory`)
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