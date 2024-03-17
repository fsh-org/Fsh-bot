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

function reaquire(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

/* Seperate files */
let playSong = reaquire('./playSong.js')

module.exports = {
  leave(that, guildId){
    try {
      (that.connections.get(guildId)).destroy();
      that.connections.delete(guildId);
      that.queue.delete(guildId);
      that.userQueue.delete(guildId);
      that.players.delete(guildId);
      that.isPlaying.set(guildId, false);
      if (!that.paused) {
        that.paused = new Map()
      }
      that.paused.set(guildId, false);

      that.commandChannel.get(guildId).text.send(`left`)

      that.commandChannel.delete(guildId)
    } catch (err) {
      // Eat error
    }
  },
  skip(that, guildId){
    that.fsh.playSong(that, guildId)
  },
  unpause(that, guildId) {
    try{
      if (!that.paused) {
        that.paused = new Map()
      }
      that.players.get(guildId).unpause()
      that.paused.set(guildId, false);
      that.commandChannel.get(guildId).text.send(`video unpaused`)
    } catch(err) {
      // eat
    }
  },
  pause(that, guildId){
    try{
      if (!that.paused) {
        that.paused = new Map()
      }
      that.players.get(guildId).pause()
      that.paused.set(guildId, true);
      that.commandChannel.get(guildId).text.send(`video paused`)
    } catch(err) {
      // eat
    }
  },
  playSong
}