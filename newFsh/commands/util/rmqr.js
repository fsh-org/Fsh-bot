const Discord = require("discord.js");

module.exports = {
  name: 'rmqr',
  slash: true,
  params: [{
    name: 'text',
    type: 'string',
    max: 150,
    min: 1,
    required: true
  }],
  category: 'utility',

  async execute(interaction, arguments, fsh) {
    let letext = await fetch(`https://api.fsh.plus/filter?text=${encodeURIComponent(arguments.text)}&char=*`);
    letext = await letext.json();

    let rmqr = await fetch('https://api.fsh.plus/rmqr?text='+letext.censor);
    rmqr = await rmqr.json();

    let binaryString = atob(rmqr.image.split(',')[1]);

    let byteArray = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    const attach = new Discord.AttachmentBuilder(Buffer.from(byteArray), {name: 'rmqr.png'});

    let embed = new Discord.EmbedBuilder()
      .setTitle('rMQR')
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor('#888888')
      .setAuthor({
        name: interaction.member.user.username,
        iconURL: interaction.member.user.displayAvatarURL({ format: "png" })
      })
      .setImage('attachment://rmqr.png');

    interaction.reply({
      files: [attach],
      embeds: [embed]
    });
  }
};