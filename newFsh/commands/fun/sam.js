const Discord = require("discord.js");

module.exports = {
  name: "sam",
  params: ['text', true],
  info: "Make text to voice using sam",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let letext = await fetch(`https://api.fsh.plus/filter?text=${arguments2.join(' ').replaceAll('`','ˋ').replaceAll('\n','\\n')}&char=*`);
    letext = await letext.json();
    letext = await letext.censor;
    let data = await fetch('https://api.fsh.plus/sam?text='+letext);
    try {
      data = await data.json();
    } catch (err) {
      message.reply('could not sam');
    }

    var binaryString = atob(data.audio.split(',')[1]);

    var byteArray = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }

    const attachment = new Discord.AttachmentBuilder(Buffer.from(byteArray), {name: 'sam.wav'});

    message.reply({
      files: [attachment]
    });
  }
};