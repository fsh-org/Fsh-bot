const Discord = require("discord.js");

module.exports = {
  name: ['robloxe','robloxexperience','robloxgame'],
  params: ['id', true],
  info: "Info of a roblox experience (universe)",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let data = await fetch(`https://games.roblox.com/v1/games?universeIds=${arguments2[0]}`);
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


    let pfp = await getof(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${data.id}&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false`);
    pfp = pfp.data[0].imageUrl;

    let vote = await getof(`https://games.roblox.com/v1/games/votes?universeIds=${data.id}`);
    vote = vote.data[0];

    let pas = await getof(`https://games.roblox.com/v1/games/${data.id}/game-passes?limit=10&sortOrder=1`);
    pas = pas.data;

    let embed = new Discord.EmbedBuilder()
      .setTitle(data.name)
      .setURL(`https://www.roblox.com/games/${data.rootPlaceId}`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888")
      .setThumbnail(pfp)
      .setDescription(`Id: ${data.id} | RootId: ${data.rootPlaceId} | Genre: ${data.genre}
Playing: ${data.playing} | Max players: ${data.maxPlayers} | Visits: ${data.visits} | Favorites: ${data.favoritedCount}
Price: ${data.price!=null ? data.price : 'Free'} | Vip servers: ${data.createVipServersAllowed} | Copying: ${data.copyingAllowed}
Updated: <t:${Math.floor(new Date(data.updated)/1000)}:R> | Created <t:${Math.floor(new Date(data.created)/1000)}:R>
By: ${data.creator.name} (${data.creator.id})

Rating: ${vote.upVotes} ${fsh.emojis.thumbsup} | ${vote.downVotes} ${fsh.emojis.thumbsdown}

${data.description}`)
    .addFields({
      name: "Game passes",
      value: pas.map(e=>{return `* ${e.name} (${e.id})
Price: ${e.price} | Product id: ${e.productId}`}).join("\n") || 'No game passes'
    });

    message.channel.send({
      embeds: [embed]
    })
  }
};