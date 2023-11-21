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
      
			that.commandChannel.get(guildId).text.send(`Left`)
      
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
      that.players.get(guildId).unpause()
    } catch(err) {
      // eat
    }
  },
  pause(that, guildId){
    try{
      that.players.get(guildId).pause()
    } catch(err) {
      // eat
    }
  },
  playSong
}