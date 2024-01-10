const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = {
  name: ['audio','mp3'],
  params: ['id/url', true],
  info: "Download a youtube video as mp3",
  category: "utility",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply('include a video id or url');
      return;
    }

    let id = message.content.split(' ')[1];
    id = id.split('v=').slice(-1)[0].split('/').slice(-1)[0].split('?')[0].split('&')[0];

    let data = await fetch(`https://api.fsh.plus/audio?id=${id}`);
    data = await data.json();

    if (data.err) {
      message.reply(`error:
${data.msg}`);
      return;
    }

    message.channel.send({files: [{ name: `${id}.mp3`, attachment: data.audio }]});
  }
};