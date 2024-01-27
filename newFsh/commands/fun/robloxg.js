const Discord = require("discord.js");

module.exports = {
  name: ['robloxg','robloxgroup'],
  params: ['id', true],
  info: "Info of a roblox group",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let data = await fetch(`https://groups.roblox.com/v1/groups/${arguments2[0]}`);
    data = await data.json();

    if (data.errors) {
      if (data.errors[0].message.includes("Too many")) {
        message.reply("To many requests wait a bit");
        return;
      }
    }
    if (!data.name) {
      message.reply("no matches");
      return;
    }

    async function getof(url) {
      let tt = await fetch(url);
      tt = await tt.json();
      return tt;
    }

    let pfp = await getof(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${data.id}&size=420x420&format=Png&isCircular=false`);
    pfp = pfp.data[0].imageUrl;

    let games = await getof(`https://games.roblox.com/v2/groups/${data.id}/games?accessFilter=2&limit=10&sortOrder=Asc`);
    games = games.data;

    let embed = new Discord.EmbedBuilder()
      .setTitle(data.name)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888")
      .setThumbnail(pfp)
      .setURL(`https://roblox.com/groups/${data.id}`)
      .setDescription(`Id: ${data.id} | Owner: ${data.owner.displayName} (${data.owner.userId}) | Members: ${data.memberCount}
Builders only: ${data.isBuildersClubOnly} | Public entry: ${data.publicEntryAllowed} | Verified: ${data.hasVerifiedBadge} | Locked: ${data.isLocked || false}

${data.description.slice(0,200)}...`)
      .addFields({
        name: "Announcement / Shout",
        value: `By: ${data.shout.poster.displayName} (${data.shout.poster.userId}) | Edited: <t:${Math.floor(new Date(data.shout.updated)/1000)}:R> | Created: <t:${Math.floor(new Date(data.shout.created)/1000)}:R>
${data.shout.body}`
      },
      {
        name: "Created games",
        value: `${games.slice(0,8).map(e => {
          return `- **${e.name}** (${e.id}):
Visits: ${e.placeVisits} | Updated: <t:${Math.floor(new Date(e.updated).getTime()/1000)}:R> | Created: <t:${Math.floor(new Date(e.created).getTime()/1000)}:R>${e.description ? "\n"+e.description.slice(0,100)+"..." : ""}`}).join("\n").slice(0,1024) || "None"}`
      });

    message.channel.send({
      embeds: [embed]
    })
  }
};