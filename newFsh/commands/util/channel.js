const Discord = require("discord.js");

function time_gud(time) {
  function edr(er,tr) {
    if (er == 0) {
      return '';
    } else {
      return er+' '+tr+(er>1?'s':'')+' '
    }
  }
  return `${edr(Math.floor(time / 31536000000),'millennium')}${edr(Math.floor(time / 31536000 % 1000),'year')}${edr(Math.floor(time % 31536000 / 604800),'week')}${edr(Math.floor(time / 86400) % 7,'day')}${edr(Math.floor(time / 3600) % 24,'hour')}${edr(Math.floor(time / 60) % 60,'minute')}${edr(time % 60,'second')}`
}

module.exports = {
  name: "channel",
  params: ['channel', false],
  info: "Channel info",
  category: "utility",

  async execute(message, arguments2, fsh) {
    let chan;
    if (arguments2[0]) {
      chan = message.guild.channels.cache.get(arguments2[0].replace(/<|>|#/g,''));
      if (!chan) {
        message.reply('not a valid channel');
        return;
      }
    } else {
      chan = message.channel;
    }

    let embed = new Discord.EmbedBuilder()
      .setTitle(chan.name)
      .setDescription(`Id: ${chan.id}
Position: ${chan.rawPosition ? chan.rawPosition : 'No position'}
Type: ${Discord.ChannelType[chan.type]} (${chan.type})
Category: <#${chan.parentId}> (${chan.parentId})
NSFW: ${chan.nsfw ? ':white_check_mark:' : ':x:'}
Slow mode: ${chan.rateLimitPerUser ? time_gud(chan.rateLimitPerUser) : 'None'}
Last pin: ${chan.lastPinTimestamp ? `<t:${Math.floor(chan.lastPinTimestamp/1000)}:R>` : 'None'}
${chan.type == 2 ? `\nRTC region: ${chan.rtcRegion == null ? 'Auto' : chan.rtcRegion}
Bitrate: ${chan.bitrate}
User limit: ${chan.userLimit == 0 ? 'None' : chan.userLimit}
Video quality mode: ${chan.videoQualityMode}\n` : ''}
${chan.topic || ''}`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888");

    message.channel.send({
      embeds: [embed]
    })
  }
};