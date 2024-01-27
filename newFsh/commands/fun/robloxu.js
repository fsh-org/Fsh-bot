const Discord = require("discord.js");

let search_cache = {};

module.exports = {
  name: ['robloxu','robloxuser'],
  params: ['query', true],
  info: "Info of a roblox user",
  category: "fun",

  async execute(message, arguments2, fsh) {
    try {
    let data;
    if (arguments2[0] in search_cache) {
      data = search_cache[arguments2[0]]
    } else {
      let resp = await fetch(`https://users.roblox.com/v1/users/search?keyword=${arguments2[0]}&limit=10`);
      data = await resp.json();
      if (!data.errors) {
        search_cache[arguments2[0]] = data
      }
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

    let users = await getof(`https://users.roblox.com/v1/users/${data.id}`);

    let pfp = await getof(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${data.id}&size=720x720&format=Png&isCircular=false`);
			pfp = pfp.data[0].imageUrl;
			
    let games = await getof(`https://games.roblox.com/v2/users/${data.id}/games?accessFilter=2&limit=10&sortOrder=Asc`);
		games = games.data

    let friends = await getof(`https://friends.roblox.com/v1/users/${data.id}/friends/count`);
    friends = friends.count;

    let followers = await getof(`https://friends.roblox.com/v1/users/${data.id}/followers/count`);
    followers = followers.count;

    let following = await getof(`https://friends.roblox.com/v1/users/${data.id}/followings/count`);
    following = following.count;

    let badges = await getof(`https://badges.roblox.com/v1/users/${data.id}/badges?limit=10&sortOrder=Asc`);
    badges = badges.data;

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${data.displayName} ${data.displayName == data.name ? "" : `(${data.name})`} ${data.hasVerifiedBadge ? fsh.emojis.good : ""}`)
      .setURL(`https://www.roblox.com/users/${data.id}/profile`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888") 
      .setThumbnail(pfp || "https://placehold.co/400x400/ffffff/000000.png?font=open-sans&text=No%20PFP")
      .setDescription(`Id: ${data.id} | Verified: ${data.hasVerifiedBadge} | Banned: ${users.isBanned}
Created: <t:${Math.floor(new Date(users.created).getTime()/1000)}:R>
Previous names: ${data.previousUsernames.join(", ") || "None"}
Friends: ${friends} | Following: ${following} | Followers: ${followers}
${String(users.description) != "undefined" ? "**About**\n"+users.description : ""}`)
      .addFields({
        name: "Created games",
        value: `${games.slice(0,8).map(e => {
return `- **${e.name}** (${e.id}):
Visits: ${e.placeVisits} | Updated: <t:${Math.floor(new Date(e.updated).getTime()/1000)}:R> | Created: <t:${Math.floor(new Date(e.created).getTime()/1000)}:R>${e.description ? "\n"+e.description.slice(0,100)+"..." : ""}`
        }).join("\n").slice(0,1024) || "None"}`
      },
      {
        name: "Badges",
        value: badges.slice(0,5).map(e => {
return `- **${e.name}** (${e.id}):
Win rate: ${e.statistics.winRatePercentage}% | Total: ${e.statistics.awardedCount} | From: ${e.awarder.type} (${e.awarder.id})
Updated: <t:${Math.floor(new Date(e.updated).getTime()/1000)}:R> | Created: <t:${Math.floor(new Date(e.created).getTime()/1000)}:R>${e.description ? "\n"+e.description : ""}`
          }).join("\n").slice(0,1024) || "None"
      });

    message.channel.send({
      embeds: [embed]
    })

    } catch (err) {
      message.reply("error!\nwait a bit and try again")
      console.log(err)
    }
  }
};