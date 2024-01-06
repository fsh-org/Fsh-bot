const Discord = require("discord.js");

module.exports = {
  name: "robloxg",
  params: ['id', true],
  info: "Info of a roblox group",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    let data = await fetch(`https://users.roblox.com/v1/users/search?keyword=${arguments2[0]}&limit=10`);
    data = await data.json();

    if (data.errors) {
      if (data.errors[0].message.includes("Too many")) {
        message.reply("To many requests wait a bit");
        return;
      }
    }
    if (!data) {
      message.reply("no matches");
      return;
    }
    if (!data.data) {
      message.reply("no matches");
      return;
    }
    if (!data.data[0]) {
      message.reply("no matches");
      return;
    }

    data = data.data[0]

    async function getof(url) {
      let tt = await fetch(url);
      tt = await tt.json();
      return tt;
    }


    let pfp = await getof(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${data.id}&size=720x720&format=Png&isCircular=false`).data[0].imageUrl;

    let games = await getof(`https://games.roblox.com/v2/users/${data.id}/games?accessFilter=2&limit=10&sortOrder=Asc`).data;

    let friends = await getof(`https://friends.roblox.com/v1/users/${data.id}/friends/count`).count;
    let followers = await getof(`https://friends.roblox.com/v1/users/${data.id}/followers/count`).count;
    let following = await getof(`https://friends.roblox.com/v1/users/${data.id}/followings/count`).count;

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${data.displayName} ${data.displayName == data.name ? "" : data.name}`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888")
      .setThumbnail(pfp)
      .setDescription(`Id: ${data.id} | Verified: ${data.hasVerifiedBadge}
Friends: ${data.friends} | Following: ${data.following} | Followers: ${data.followers}
Previous names: ${data.previousUsernames.join(", ") || "None"}`)
      .addFields({
        name: "Created games",
        value: `${games.map(e => {return `- ${e.name} (${e.id}):
Visits: ${e.placeVisits} | Updated: <t:${Math.floor(new Date(e.updated).getTime()/1000)}:R> | Created: <t:${Math.floor(new Date(e.created).getTime()/1000)}:R>${e.description ? "\n"+e.description : ""}`}).join("\n")}`
      });

    message.channel.send({
      embeds: [embed]
    })
  }
};