const Discord = require("discord.js");

let test = (value, maxValue, size) => {
  function MaskCharacter(str, mask, n = 1) {
    return ("" + str).slice(0, -n).replace(/./g, mask) + ("" + str).slice(-n);
  }
  const percentage = value / maxValue;
  const progress = Math.round(size * percentage);
  const emptyProgress = size - progress;
  const progressText = "◉".repeat(progress);
  const emptyProgressText = "—".repeat(emptyProgress);
  const percentageText = Math.round(percentage * 100) + "%";
  //const bar = "```[" + MaskCharacter(progressText, "—") + emptyProgressText + "]" + "```";
  const bar =
    "```[" +
    MaskCharacter(progressText, "—") +
    emptyProgressText +
    "]" +
    percentageText +
    "```";
  return bar;
};

function mptourl(u, activity) {
  let url = u;
  if (!isNaN(url))
    url = `https://cdn.discordapp.com/app-assets/${activity.applicationId}/${url}.png`;
  return url.replace("mp:", "https://media.discordapp.net/");
}

module.exports = {
  name: "activities",
  params: ["userid/ping", false],
  info: "Get user activities",
  category: "utility",
  async execute(message, arguments2, fsh) {
    //if (!fsh.devIds.includes(message.author.id)) return;
    /*
		Playing	0
		Streaming	1
		Listening	2
		Watching	3
		Custom	4
		Competing	5
		*/

    let embeds = [];

    // Get mention/member
    let targetUser = message.mentions.members.at(0) ?? false;
    if (!targetUser) {
      try {
        if (!arguments2[0].length) throw new Error("balls");
        targetUser = await message.guild.members.fetch(arguments2[0]);
        // message.guild.members.cache.get(arguments2[0])
        if (targetUser == undefined) throw new Error("balls");
      } catch (err) {
        targetUser = message.member;
      }
    }

    //console.log(targetUser)

    /* No presence */
    if (!targetUser.presence) {
      // code
      message.channel.send("not online presence");
      return;
    }
    if(!targetUser.presence.activities){
      message.channel.send("no activities :<");
      return;
    }

    targetUser.presence.activities.forEach((activity) => {
      let type =
        activity.type == 0
          ? "Playing "
          : activity.type == 1
          ? "Streaming "
          : activity.type == 2
          ? "Listening to "
          : activity.type == 3
          ? "Watching "
          : activity.type == 4
          ? ""
          : activity.type == 5
          ? "Competing in "
          : "Unknown ";

      const emb = new Discord.EmbedBuilder().setColor(0x0099ff);

      emb.setTitle(`${type}\`${activity.name}\``);

      if (activity.name == "Spotify") {
        /*emb.setDescription(
          `Remaining in song: <t:${Math.floor(
            new Date(activity.timestamps.end).getTime() / 1000
          )}:R>`
        );*/
        let j = {};
        j.s = Math.floor(new Date(activity.timestamps.start).getTime() / 1000);
        j.e = Math.floor(new Date(activity.timestamps.end).getTime() / 1000);
        j.c = Math.floor(new Date().getTime() / 1000);
        emb.setDescription(
          test(j.e - j.s - (j.e - (j.s + (j.c - j.s))), j.e - j.s, 10)
        );
        emb.addFields({
          name: activity.details,
          value: `by \`${activity.state}\`\non \`${activity.assets.largeText}\``,
          inline: true,
        });
        emb.setThumbnail(
          activity.assets.largeImage.replace(
            "spotify:",
            "https://i.scdn.co/image/"
          ) || ""
        );
      } else {
        emb.setDescription(
          `${activity.details == null ? "" : `${activity.details}\n`}${
            activity.state == null ? "" : `${activity.state}\n`
          }${activity.url == null ? "" : `[URL](${activity.url})\n`}` || null
        );
        /* Image stuff */
        if (activity.emoji) {
          emb.setThumbnail(activity.emoji.url);
          if (activity.assets) {
            if (activity.assets.largeImage) {
              emb.setImage(mptourl(activity.assets.largeImage, activity));
            } else if (activity.assets.smallImage) {
              emb.setImage(mptourl(activity.assets.smallImage, activity));
            }
          }
        } else if (activity.assets) {
          if (activity.assets.smallImage) {
            emb.setThumbnail(mptourl(activity.assets.smallImage, activity));
            if (activity.assets.largeImage)
              emb.setImage(mptourl(activity.assets.largeImage, activity));
          } else if (activity.assets.largeImage) {
            emb.setThumbnail(mptourl(activity.assets.largeImage, activity));
          }
        }
        /* Asset text manag */
        if (activity.assets) {
          emb.addFields({
            name: activity.assets.largeText || " ",
            value: activity.assets.smallText || " ",
          });
        }
      }

      embeds.push(emb);

      /*const exampleEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle('Some title')
				.setURL('https://discord.js.org/')
				.setAuthor({
					name: 'Some name',
					iconURL: 'https://i.imgur.com/AfFp7pu.png',
					url: 'https://discord.js.org'
				})
				.setDescription('Some description here')
				.setThumbnail('https://i.imgur.com/AfFp7pu.png')
				.addFields({
					name: 'Regular field title',
					value: 'Some value here'
				}, {
					name: '\u200B',
					value: '\u200B'
				}, {
					name: 'Inline field title',
					value: 'Some value here',
					inline: true
				}, {
					name: 'Inline field title',
					value: 'Some value here',
					inline: true
				}, )
				.addFields({
					name: 'Inline field title',
					value: 'Some value here',
					inline: true
				})
				.setImage('https://i.imgur.com/AfFp7pu.png')
				.setTimestamp()
				.setFooter({
					text: 'Some footer text here',
					iconURL: 'https://i.imgur.com/AfFp7pu.png'
				});*/
    });

    if (!embeds.length) {
      message.channel.send("Error: no activities found");
      console.log(embeds)
    } else {
      message.channel.send({ embeds });
    }
  }
};