const Discord = require("discord.js");

module.exports = {
  name: "tts",
  params: ['lang', true, 'text', true],
  info: "Info on command",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let data = await fetch('https://api.fsh.plus/tts?lang='+(arguments2[0].length == 2 ? arguments2[0] : 'en')+'&text='+(arguments2[0].length == 2 ? arguments2.slice(1,arguments2.length).join(' ') : arguments2.join(' ')));
    data = await data.json();
    
    var binaryString = atob(data.audio.split(',')[1]);

    var byteArray = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }
    
    const attachment = new Discord.AttachmentBuilder(Buffer.from(byteArray), {name: 'tts.wav'});

    message.reply({
      files: [attachment]
    })
  }
};