const Discord = require("discord.js");

module.exports = {
  name: "qr",
  params: ["text", true],
  info: "Creates a qr from text",
  category: "utility",

  async execute(message, arguments2, fsh) {
    let letext = await fetch(`https://api.fsh.plus/filter?text=${arguments2.join(" ").replaceAll("`","ˋ").replaceAll('\n',' [new line] ')}&char=*`);
    letext = await letext.json();
    letext = await letext.censor;
    if (letext.length > 1950) {
      message.reply(`message must be less than 1950 in length (${letext.length})`);
      return;
    }

    let qr = await fetch('https://api.fsh.plus/qr?text='+letext);
    qr = await qr.json();

    let binaryString = atob(qr.qr.split(',')[1]);

    let byteArray = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    const attach = new Discord.AttachmentBuilder(Buffer.from(byteArray), {name: 'qr.png'});

    let embed = new Discord.EmbedBuilder()
      .setTitle("QR creator")
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: "png" })
      })
      .setImage('attachment://qr.png')
      .setDescription(`QR created with text
\`"${letext}"\``);

    message.channel.send({
      files: [attach],
      embeds: [embed]
    })
  }
};