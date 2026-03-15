const Discord = require('discord.js');
const { useQueue, useTimeline } = require('discord-player');

function prettyNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

module.exports = {
  name: ['now-playing', 'np'],
  params: [],
  info: 'Get current song',
  category: 'music',

  async execute(message, arguments2, fsh) {
    let queue = useQueue(message.guild.id);
    if (fsh.music.checkQueue(message, queue)) return;
    const { timestamp, track } = useTimeline({ node: message.guild.id });

    let base = new Discord.ContainerBuilder()
      .setAccentColor(parseInt('888888', '16'));

    base.addTextDisplayComponents([
      new Discord.TextDisplayBuilder().setContent(`# ${fsh.emojis.music} ${track.cleanTitle}
By: ${track.author.replace(' - Topic', '')} | Views: ${prettyNumber(track.views)}
${queue.node.createProgressBar({
  leftChar: fsh.emojis.tl,
  indicator: fsh.emojis.ti,
  rightChar: fsh.emojis.tr
})} ${timestamp.progress}%`)
    ]);

    base.addMediaGalleryComponents([
      new Discord.MediaGalleryBuilder().addItems([
        new Discord.MediaGalleryItemBuilder()
          .setURL(track.thumbnail)
          .setDescription('Thumbnail of the video')
      ])
    ]);

    base.addActionRowComponents([
      new Discord.ActionRowBuilder()
        .addComponents([
          new Discord.ButtonBuilder()
            .setStyle(Discord.ButtonStyle.Link)
            .setLabel('View on '+track.raw.source)
            .setURL(track.url)
        ])
    ]);

    message.channel.send({
      flags: Discord.MessageFlags.IsComponentsV2,
      components: [base]
    });
  }
}