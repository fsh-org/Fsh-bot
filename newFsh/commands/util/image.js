const Discord = require("discord.js");

const filters = 'ad,ascii,bi,blur,communism,deepfry,flip,flop,gay,greyscale,gun,invert,jail,image-mean,pixelate,sepia,uncover,wanted'.split(',');

module.exports = {
  name: "image",
  params: ['filter', true],
  info: "Apply a filter to a image (empty filter for list)",
  category: "utility",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply('Avaible filters:\n- '+filters.join('\n- '))
      return;
    }
    if (!filters.includes(arguments2[0])) {
      message.reply('not recognized type of filter')
      return;
    }
    const attachment = message.attachments.first();

    if (!attachment) {
      message.reply('include atachement');
      return;
    }
    if (!attachment.contentType.startsWith('image/')) {
      message.reply('must be image');
      return;
    }

    let atta = attachment.attachment;
    atta = await fetch(atta);
    atta = await atta.arrayBuffer();
    atta = Buffer.from(atta);

    let data = await fetch('https://api.fsh.plus/'+arguments2[0], {
      method: 'POST',
      headers: {'content-type': 'application/octet-stream'},
      body: atta
    });
    data = await data.json()

    let binaryString = atob(data.image.split(',')[1]);

    let byteArray = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    const attach = new Discord.AttachmentBuilder(Buffer.from(byteArray), { name: 'edited.png' });

    message.reply({
      content: `Requested by: <@${message.author.id}>`,
      files: [attach]
    })
  }
};