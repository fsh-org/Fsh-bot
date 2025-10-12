const Discord = require("discord.js");

module.exports = {
  name: 'qr',
  slash: true,
  params: [{
    name: 'text',
    type: 'string',
    max: 1500,
    min: 1,
    required: true
  }],
  category: 'utility',

  async execute(interaction, arguments, fsh) {
    let letext = await fetch(`https://api.fsh.plus/filter?text=${encodeURIComponent(arguments.text)}&char=*`);
    letext = await letext.json();

    let qr = await fetch('https://api.fsh.plus/qr?text='+letext.censor);
    qr = await qr.json();

    let binaryString = atob(qr.qr.split(',')[1]);

    let byteArray = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    const attach = new Discord.AttachmentBuilder(Buffer.from(byteArray), {name: 'qr.png'});

    let embed = new Discord.EmbedBuilder()
      .setTitle('QR')
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor('#888888')
      .setAuthor({
        name: interaction.member.user.username,
        iconURL: interaction.member.user.displayAvatarURL({ format: "png" })
      })
      .setImage('attachment://qr.png');

    interaction.reply({
      files: [attach],
      embeds: [embed]
    });
  }
};