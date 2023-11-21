const Discord = require("discord.js");

function toTitle(str) {
  return str.replace(/\S+/g, function (txt) {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase();
  });
}

module.exports = {
  name: ['review','reviews'],
  params: ['member', false],
  info: 'Shows reviews of a user (from reviewDB)',
  category: "utility",

  async execute(message, arguments2, fsh) {

    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    if (!typeof Number(user) == "Number") return;
    user = fsh.client.users.cache.get(user) || message.author;

    let reviews = await fetch(`https://manti.vendicated.dev/api/reviewdb/users/${user.id}/reviews`);
    reviews = await reviews.json();

    var embed = new Discord.EmbedBuilder()
      .setTitle(`${toTitle(user.displayName)}'${user.displayName.endsWith("s") ? "":"s"} reviews (${reviews.reviewCount})`)
      .setFooter({
        text: `V${fsh.version}`
      })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setThumbnail(user.displayAvatarURL({
        format: "png"
      }));
    if (reviews.success) {
      embed.setDescription(`User reviews powered by [ReviewDB](<https://reviewdb.mantikafasi.dev>)${reviews.reviewCount==0?"\nNo reviews":""}`)

      let fields = [];
      reviews.reviews.slice(1,10).forEach(h => {
        fields.push({
          name: `${toTitle(h.sender.username)} <t:${h.timestamp}:R>`,
          value: h.comment
        })
      })
      embed.addFields(fields);
    } else {
      embed.setDescription(`Could not get reviews`)
    }

    message.channel.send({
      embeds: [embed]
    })
  }
};