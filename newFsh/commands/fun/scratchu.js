const Discord = require("discord.js");

function fermet(t) {
  return t.replaceAll("<br>","\n").replaceAll(/(<a href=\".+\">)(?:.+<\/a>)/g, function replacer(match, p1, p2) {return `[${match.split('>')[1].replace("</a","")}](https://scratch.mit.edu${match.split('"')[1]})`}).slice(0, 1024);
}

module.exports = {
  name: "scratchu",
  params: ['username', true],
  info: "Info on a scratch user",
  category: "fun",

  async execute(message, arguments2, fsh) {
    if (arguments2.length < 1) {
      message.channel.send("Please provide a project id")
      return;
    }
    let data = await fetch(`https://scratchdb.lefty.one/v3/user/info/${arguments2[0]}`)
    data = await data.json();
    if (String(data.error) != "undefined") {
      message.channel.send("User not in cache")
      return;
    }

    let Ucreate = Math.floor(new Date(data.joined).getTime() / 1000)
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${data.username} [${data.status}]`)
      .setDescription(`id: ${data.id} sys_id: ${data.sys_id}
Joined: <t:${Ucreate}:R> (<t:${Ucreate}:t> | <t:${Ucreate}:d>)
Country: ${data.country}${data.school ? ` | School: ${data.school}` : ""}`)
      .setThumbnail(`https://uploads.scratch.mit.edu/get_image/user/${data.id}_512x512.png`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888")
      .setURL(`https://scratch.mit.edu/users/${data.username}/`);
    if (data.bio) {
      embed.addFields({
        name: `Bio`,
        value: fermet(data.bio),
        inline: true
      })
    }
    if (data.work) {
      embed.addFields({
        name: `Work`,
        value: fermet(data.work),
        inline: true
      })
    }
    try {
      embed.addFields({
        name: "Statistics",
        value: `Views: ${data.statistics.views} (#${data.statistics.ranks.views})
Loves: ${data.statistics.loves} (#${data.statistics.ranks.loves})
Favorites: ${data.statistics.favorites} (#${data.statistics.ranks.favorites})
Comments: ${data.statistics.comments} (#${data.statistics.ranks.comments})
Followers: ${data.statistics.followers} (#${data.statistics.ranks.followers})
Following: ${data.statistics.following} (#${data.statistics.ranks.following})`,
        inline: false
      })
    } catch (err) {}

    message.reply({
      embeds: [embed]
    })
  },
};
