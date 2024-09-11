const Discord = require('discord.js');
const { Player } = require('discord-player');
const { YoutubeiExtractor } = require('discord-player-youtubei');
const { Log } = require('youtubei.js');
Log.setLevel(Log.Level.NONE);

function prettyNumber(x) {
  x = x.toString();
  x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return x;
}

async function createMusic(fsh) {
  // Useful functions
  fsh.music = {
    setStatus: function(channel, text){
      fetch('https://discord.com/api/v10/channels/'+channel+'/voice-status', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          authorization: 'Bot '+fsh.client.token
        },
        body: JSON.stringify({ status: text })
      })
    },
    checkVoice: function(message){
      if (!message.member.voice?.channel) {
        message.reply('connect to a voice channel');
        return true;
      };
      return false
    },
    checkQueue: function(message, queue){
      if (!queue) {
        message.reply('no queue in this server');
        return true;
      };
      return false
    },
    checkSameVoice: function(message, queue){
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
  await player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');
  await player.extractors.register(YoutubeiExtractor, {
    overrideBridgeMode: "ytmusic",
    streamOptions: {
      useClient: 'iOS',
      highWaterMark: 2 * 1_024 * 1_024
    }
  });

  // Events
  player.events.on('playerStart', (queue, track) => {
    fsh.music.setStatus(queue.metadata.voice.id, 'Playing: '+track.cleanTitle)
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.music} Now Playing: ${track.raw.source} - ${track.cleanTitle}`)
      .setDescription(`Views: ${prettyNumber(track.views)} Duration: ${track.duration}`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#888888")
      .setURL(track.url)
      .setImage(track.thumbnail)
      .setAuthor({
        name: track.author.replace(' - Topic','')
      });

    queue.metadata.text.send({
      embeds: [embed]
    })
  });
  player.events.on('audioTrackAdd', (queue, track) => {
    if (queue.currentTrack === null) return;
    queue.metadata.text.send(`added ${track.cleanTitle} to queue (${queue.tracks.data.length})`);
  });
  player.events.on('emptyChannel', (queue) => {
    queue.metadata.text.send(`no one left on the voice channel`);
  });
  player.events.on('emptyQueue', (queue) => {
    queue.metadata.text.send('nothing left for me to play');
    fsh.music.setStatus(queue.metadata.voice.id, 'Empty queue')
  });
  player.events.on('error', (queue, error) => {
    console.log(error);
    queue.metadata.text.send('there was an error, leaving...');
    queue.delete();
  });
}

module.exports = createMusic;