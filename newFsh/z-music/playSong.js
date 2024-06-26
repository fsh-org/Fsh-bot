const ytstream = require('yt-stream');
const {
  createAudioResource
} = require('@discordjs/voice')

const Discord = require("discord.js")

function time_gud(tim) {
  let time = tim/1000 //we have to split tim 1000X :shock:
  return `${time > 86399 ? `${Math.floor(time / 86400)}d `: ""}${time > 3599 ? `${Math.floor(time / 3600) % 24}h ` : ""}${Math.floor(time / 60) % 60}m ${time % 60}s`;
}

module.exports = async function(_this, guildId) {
  let fsh = _this.fsh;
  _this.isPlaying.set(guildId, true)
  _this.paused.set(guildId, false)
  try {
    let stream,
      player = _this.players.get(guildId),
      queue = _this.queue.get(guildId),
      song = queue.splice(0, 1)[0],
      title, author, results;
    let songName = (_this.userQueue.get(guildId)).splice(0, 1);
    try {
      if (ytstream.validateURL(song)) {
        stream = await ytstream.stream(song, {
          quality: 'high',
          type: 'audio',
          highWaterMark: 1048576 * 32
        });
        results = await ytstream.getInfo(song)
      } else {
        results = await ytstream.search(song);
        stream = await ytstream.stream(results[0].url, {
          quality: 'high',
          type: 'audio',
          highWaterMark: 1048576 * 32
        });
        results = results[0];
      };
      try {
        let embed = new Discord.EmbedBuilder()
          .setTitle(`${_this.fsh.emojis.youtube} Currently playing: ${results.title}`)
          .setDescription(`Views: ${results.views_text} Uploaded: ${results.uploaded} Duration: ${time_gud(results.duration)}`)
          .setFooter({ text: `V${_this.fsh.version}` })
          .setTimestamp(new Date())
          .setColor("#999999")
          .setURL(results.url)
          .setImage(results.default_thumbnail.url)
          .setAuthor({
            name: results.author,
            url: results.channel.url
          });
        (_this.commandChannel.get(guildId)).text.send({
          embeds: [embed]
        })
      } catch (err) {
        // eat
      }
      let resource = createAudioResource(stream.stream, {
        inputType: stream.type
      })
      player.play(resource)
    } catch (err) {
      if (err.includes("age")) {
        _this.commandChannel.get(guildId).text.send('source is age restricted, cannot play')
        if (!_this.queue.get(guildId).length){
          return _this.leave(guildId)
        }
        _this.skip(guildId)
      } else {
        _this.commandChannel.get(guildId).text.send(`error occured while getting: \`${songName}\``)
        _this.skip(guildId)
      }
    }
  } catch (err) {
    //Eat
  }
};