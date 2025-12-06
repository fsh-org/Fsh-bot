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
  category: "fun",

  async execute(message, arguments2, fsh) {
    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    user = fsh.client.users.cache.get(user) || message.author;

    let reviews = await fetch(`https://manti.vendicated.dev/api/reviewdb/users/${user.id}/reviews`);
    reviews = await reviews.json();

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${toTitle(user.displayName)}'${user.displayName.endsWith("s") ? "":"s"} reviews (${reviews.reviewCount})`)
      .setFooter({
        text: `V${fsh.version}`
      })
      .setTimestamp(new Date())
      .setColor('#888888')
      .setThumbnail(user.displayAvatarURL({
        format: "png"
      }));
    if (reviews.reviewCount < 1) {
      embed.setDescription('No reviews');
    } else if (reviews.success) {
      if (reviews.reviews[0].comment.includes('opted out')) {
        embed.setDescription('User has turned off reviews');
        message.channel.send({
          embeds: [embed]
        });
        return;
      }

      let fields = [];
      let rews = reviews.reviews;
      if (arguments2[1] != "non" && arguments2[0] != "non") {
        rews = rews
          .filter(e=>e.comment.length>3||e.comment==='fsh')
          .filter(e=>e.comment.length<100);
        ["craz","doodooballs","ass","cum","cock","sex","esex","xxx","sigma","smoooooth","Roblox Story","My name is Walter Hartwell White","they (put|locked) me in a ","cheese drill","person (above|below) me is","fanum","poo","edged","btich","bitch","rizz","skibidi"].forEach(bad=>{
          rews = rews.filter(e=>!(new RegExp(bad,'ig')).test(e.comment));
        });
      }

      embed.setDescription(`User reviews powered by [ReviewDB](<https://reviewdb.mantikafasi.dev>)${reviews.reviews.length > rews.length ? "\nSome reviews have been omitted, add non at the end to include.":""}`);

      rews = rews.slice(1,15);
      rews.forEach(h => {
        fields.push({
          name: `${toTitle(h.sender.username)} <t:${h.timestamp}:R>`,
          value: h.comment
        })
      })
      embed.addFields(fields);
    } else {
      embed.setDescription('Could not get reviews');
    }

    message.channel.send({
      embeds: [embed]
    });
  }
};