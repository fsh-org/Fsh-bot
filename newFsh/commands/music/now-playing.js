const Discord = require("discord.js");
const { useQueue, useTimeline } = require("discord-player");

function prettyNumber(x) {
  x = x.toString();
  x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return x;
}

module.exports = {
  name: ["now-playing", 'np'],
  params: [],
  info: "Get current song",
  category: "music",

  async execute(message, arguments2, fsh) {
    let queue = useQueue(message.guild.id);
    if (fsh.music.checkQueue(message, queue)) return;
    const { timestamp, track } = useTimeline(message.guild.id);

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.music} Now Playing: ${track.raw.source} - ${track.cleanTitle}`)
      .setDescription(`Views: ${prettyNumber(track.views)}
${queue.node.createProgressBar({
  leftChar: fsh.emojis.tl,
  indicator: fsh.emojis.ti,
  rightChar: fsh.emojis.tr
})} ${timestamp.progress}%`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#888888")
      .setURL(track.url)
      .setImage(track.thumbnail)
      .setAuthor({
        name: track.author.replace(' - Topic','')
      });

    message.channel.send({
      embeds: [embed]
    })
  }
}