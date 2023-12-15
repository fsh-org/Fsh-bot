const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytstream = require('yt-stream');
const fs = require('fs');

module.exports = {
  name: ['video','mp4'],
  params: ['id/url', true],
  info: "Info on command",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply('include a video id or url');
      return;
    }/*

    console.log(stream.video_url);
    console.log(stream.url);
*/
    let url;
    
    if (ytstream.validateURL(arguments2[0])) {
      url = arguments2[0]
    } else {
      if (ytstream.validateID(arguments2[0])) {
        url = ytstream.getURL(arguments2[0])
      } else {
        message.reply('could not find video, use id or url.');
        return;
      }
    }

    //const info = await ytstream.getInfo(url);
    try {
      let output = await ytdl(url, { filter: 'audioandvideo' })
    } catch (err) {
      console.log(err)
    }
    
    //const attachment = new Discord.AttachmentBuilder(output, { name: `${info.title.replaceAll(" ","_").replace(/[^a-zA-Z0-9_\-]/g, '')}.mp4` })
    const attachment = new Discord.AttachmentBuilder(output, { name: `output.mp4` })
    message.channel.send({files: [attachment]});
  }
};