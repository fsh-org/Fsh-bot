const logic = require('./z-music')

const Discord = require("discord.js")
const ytstream = require('yt-stream');
const {
  createAudioPlayer,
  createAudioResource,
  StreamType,
  demuxProbe,
  joinVoiceChannel,
  NoSubscriberBehavior,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  getVoiceConnection
} = require('@discordjs/voice')

class MusicClient {
  constructor(fsh) {
    this.queue = new Map();
    this.userQueue = new Map();
    this.players = new Map();
    this.connections = new Map();
    this.commandChannel = new Map();
    this.isPlaying = new Map();
    this.paused = new Map();
    this.looped = new Map();

    this.fsh = fsh;

    fsh.musicCilent = this;
  }
  async play(message, voiceChannel, input, errorMessage = {}) {
    let guildId = message.guild.id;
    // If no music command Channel
    if (!this.commandChannel.has(guildId)) {
      this.commandChannel.set(guildId, {text: message.channel, vc: voiceChannel})
    }
    let errMsg = errorMessage;
    if (Object.keys(errorMessage).length === 0) errMsg = {
      content: `your not in my music command channel <#${this.commandChannel.get(guildId).text.id}>`
    }
    try{
      if (!(message.channel.id == (this.commandChannel.get(guildId)).text.id)) return message.reply(errMsg)
    }catch(err){
      // Eat
    }
    // If no queue exists for channel
    if (!this.queue.has(guildId)) {
      this.isPlaying.set(guildId, false)
      this.paused.set(guildId, false)
      this.looped.set(guildId, false)
      this.queue.set(guildId, [])
      this.userQueue.set(guildId, [])
    }
    await this.addQueue(guildId, message, input)
    // If queue is empty return
    if (!(this.queue.has(guildId))) return
    if (!(this.queue.get(guildId)).length) return
    // No audio player exists for guild
    if (!this.players.has(guildId)) {
      // Create player
      let player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Play
        }
      })
      // set _this to this
      let _this = this;
      // When player is done
      player.on(AudioPlayerStatus.Idle, async () => {
        if (_this.looped.get(guildId)) {
          console.log(_this.queue.get(guildId))
          this.fsh.playSong(_this, guildId)
        } else {
          let queue = _this.queue.get(guildId);
          try {
            if (!queue.length) {
              (_this.connections.get(guildId)).destroy();
              _this.connections.delete(guildId);
              _this.queue.delete(guildId);
              _this.userQueue.delete(guildId);
              _this.players.delete(guildId);
              _this.isPlaying.set(guildId, false);
              _this.paused.set(guildId, false);
              _this.looped.set(guildId, false);
              _this.commandChannel.get(guildId).text.send(`nothing left for me to play`);
              _this.commandChannel.delete(guildId)
            } else {
              this.fsh.playSong(_this, guildId)
            }
          } catch (err) {
            // eat err
          }
        }
      });
      // Save player
      this.players.set(guildId, player)
      this.fsh.playSong(this, guildId)
    }
    // No voice connection exists
    if (!getVoiceConnection(guildId)) {
      // Create voice connection
      let conn = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guildId,
        adapterCreator: message.guild.voiceAdapterCreator,
        selfDeaf: true
      })
      // Add guild player to connection
      conn.subscribe(this.players.get(guildId))
      this.connections.set(guildId, conn)
    }

  }
  async addQueue(guildId, message, input) {
    let queue = this.queue.get(guildId)
    let userQueue = this.userQueue.get(guildId)
    // Get video info
    let title, url;
    try {
      if (ytstream.validateURL(input)) {
        const results = await ytstream.getInfo(input)
        title = results.title
        url = input
      } else {
        const results = await ytstream.search(input);
        if (!results.length) return message.reply(`no results found for \`${input}\``)
        title = results[0].title;
        url = results[0].url;
      }
      userQueue.push(title)
      queue.push(url);
      if (this.isPlaying.get(guildId)) message.reply(`added \`${title}\` to the queue at position \`${queue.length}\``)
    } catch (err) {
      message.channel.send(`error when adding to queue`)
    }
  }
  getQueue(guildId) {
    if (this.userQueue.has(guildId)) return this.userQueue.get(guildId)
    return []
  }
  getChannels(guildId) {
    if (this.commandChannel.has(guildId)) return this.commandChannel.get(guildId)
    return {}
  }
  leave(guildId) { logic.leave(this, guildId) }
  skip(guildId) { logic.skip(this, guildId) }
  pause(guildId){ logic.pause(this, guildId) }
  unpause(guildId){ logic.unpause(this, guildId) }
  loop(guildId){ logic.loop(this, guildId) }
  unloop(guildId){ logic.unloop(this, guildId) }
  volume(guildId, volume){ logic.volume(this, guildId, volume) }
}

module.exports = MusicClient;