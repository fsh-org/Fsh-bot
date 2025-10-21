const Discord = require("discord.js");

module.exports = {
  name: 'sam',
  slash: true,
  params: [{
    name: 'text',
    type: 'string',
    max: 2000,
    min: 1,
    required: true
  }],
  category: 'fun',

  async execute(interaction, arguments, fsh) {
    let letext = await fetch(`https://api.fsh.plus/filter?text=${encodeURIComponent(arguments.text)}&char=*`);
    letext = await letext.json();

    let data = await fetch('https://api.fsh.plus/sam?text='+letext.censor);
    try {
      data = await data.json();
    } catch (err) {
      interaction.reply({ content: 'could not sam', flags: Discord.MessageFlags.Ephemeral });
    }

    let binaryString = atob(data.audio.split(',')[1]);

    let byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    const attachment = new Discord.AttachmentBuilder(Buffer.from(byteArray), {name: 'sam.wav'});

    interaction.reply({
      files: [attachment]
    });
  }
};