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
      that.paused.set(guildId, false);
      that.looped.set(guildId, false);

      that.commandChannel.get(guildId).text.send(`left`)

      that.commandChannel.delete(guildId)
    } catch (err) {
      // Eat error
    }
  },
  skip(that, guildId){
    that.fsh.playSong(that, guildId)
  },
  pause(that, guildId){
    try{
      that.players.get(guildId).pause()
      that.paused.set(guildId, true);
      that.commandChannel.get(guildId).text.send(`music paused`)
    } catch(err) {
      // eat
    }
  },
  unpause(that, guildId) {
    try{
      that.players.get(guildId).unpause()
      that.paused.set(guildId, false);
      that.commandChannel.get(guildId).text.send(`music unpaused`)
    } catch(err) {
      // eat
    }
  },
  loop(that, guildId){
    try{
      that.looped.set(guildId, true);
      that.commandChannel.get(guildId).text.send(`music looped`)
    } catch(err) {
      // eat
    }
  },
  unloop(that, guildId) {
    try{
      that.looped.set(guildId, false);
      that.commandChannel.get(guildId).text.send(`music unlooped`)
    } catch(err) {
      // eat
    }
  },
  volume(that, guildId, volume) {
    console.log(that.players.get(guildId)._state.resource.volume)
    that.players.get(guildId)._state.resource.volume.setVolume(volume);
  },
  playSong
}