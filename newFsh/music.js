const Discord = require('discord.js');
const { Player, GuildQueueEvent } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor');
const { YoutubeiExtractor } = require('discord-player-youtubei');
const { Log } = require('youtubei.js');
Log.setLevel(Log.Level.NONE);

function prettyNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

async function createMusic(fsh) {
  // Useful functions
  fsh.music = {
    setStatus: (channel, text)=>{
      fetch(`https://discord.com/api/v10/channels/${channel}/voice-status`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          authorization: 'Bot '+fsh.client.token
        },
        body: JSON.stringify({ status: text })
      })
    },
    checkVoice: (message)=>{
      if (!message.member.voice?.channel) {
        message.reply('connect to a voice channel');
        return true;
      };
      return false
    },
    checkQueue: (message, queue)=>{
      if (!queue) {
        message.reply('no queue in this server');
        return true;
      };
      return false
    },
    checkSameVoice: (message, queue)=>{
      if (queue) {
        if (queue.metadata.voice.id !== message.member.voice.channel.id) {
          message.reply('you are not in my voice channel');
          return true;
        };
      }
      return false
    }
  };

  // Create player
  const player = new Player(fsh.client, {
    useLegacyFFmpeg: false,
    skipFFmpeg: false
  });

  // Music extractors
  await player.extractors.loadMulti(DefaultExtractors);
  await player.extractors.register(YoutubeiExtractor, {
    overrideBridgeMode: 'ytmusic',
    cookie: process.env.yt,
    streamOptions: {
      useClient: 'WEB',
      highWaterMark: 2 * 1_024 * 1_024
    }
  });

  // Events
  player.events.on(GuildQueueEvent.PlayerStart, (queue, track) => {
    fsh.music.setStatus(queue.metadata.voice.id, track.cleanTitle)

    let base = new Discord.ContainerBuilder()
      .setAccentColor(parseInt('888888', '16'));

    base.addTextDisplayComponents([
      new Discord.TextDisplayBuilder().setContent(`# ${fsh.emojis.music} ${track.cleanTitle}
By: ${track.author.replace(' - Topic', '')} | Views: ${prettyNumber(track.views)} | Duration: ${track.duration}`)
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

    queue.metadata.text.send({
      flags: Discord.MessageFlags.IsComponentsV2,
      components: [base]
    });
  });
  player.events.on(GuildQueueEvent.AudioTrackAdd, (queue, track) => {
    if (queue.currentTrack === null) return;
    queue.metadata.text.send(`added ${track.cleanTitle} to queue (${queue.tracks.data.length})`);
  });
  player.events.on(GuildQueueEvent.VolumeChange, (queue, old, volume) => {
    queue.metadata.text.send(`volume set from ${old} to ${volume}`);
  });
  player.events.on(GuildQueueEvent.EmptyChannel, (queue) => {
    queue.metadata.text.send(`no one left on the voice channel`);
  });
  player.events.on(GuildQueueEvent.EmptyQueue, (queue) => {
    queue.metadata.text.send('nothing left for me to play');
    fsh.music.setStatus(queue.metadata.voice.id, 'Empty queue');
  });
  player.events.on(GuildQueueEvent.Error, (queue, error) => {
    console.log(error);
    queue.metadata.text.send('there was an error, leaving...');
    queue.delete();
  });
  player.events.on(GuildQueueEvent.PlayerError, (queue, error) => {
    console.log(error);
    queue.metadata.text.send('there was an error, leaving...');
    queue.delete();
  });
}

module.exports = createMusic;