const Discord = require("discord.js");

module.exports = {
  name: ['video','mp4'],
  params: ['id/url', true, 'name', false],
  info: "Download a youtube video as mp4",
  category: "utility",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply('include a video id or url');
      return;
    }

    let id = message.content.split(' ')[1];
    id = id.split('v=').slice(-1)[0].split('/').slice(-1)[0].split('?')[0].split('&')[0];

    let data = await fetch(`https://api.fsh.plus/video?id=${id}&max=25000000`);
    data = await data.json();

    if (data.err) {
      message.reply(`error:
${data.msg}`);
      return;
    }

    let msg = {
      files: [
        { name: `${arguments2[1] || id}.mp4`, attachment: data.video }
      ]
    };

    if (data.lower) {
      msg.content = `video too big, viewing lower resolution, [higher resolution here](<${data.full}>)`;
    }

    message.channel.send(msg);
  }
};