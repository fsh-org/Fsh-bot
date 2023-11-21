const Discord = require("discord.js");
const QRCode = require('qrcode')

module.exports = {
  name: "textqr",
  params: ["text", true],
  info: "Creates a text qr from text",
  category: "utility",

  async execute(message, arguments2, fsh) {
    let letext = await fetch(`https://api.fsh.plus/filter?text=${arguments2.join(" ").replaceAll("`","ˋ").replaceAll('\n',' [new line] ')}&char=*`);
    letext = await letext.json();
    letext = await letext.censor;
    if (letext.length > 1950) {
      message.reply(`message must be less than 1950 in length (${letext.length})`)
      return;
    }
    
    var embed = new Discord.EmbedBuilder()
      .setTitle("Text QR creator")
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: "png" })
      });
    
      QRCode.toString(letext, {
        type: "image"
      }, async (err, QR) => {
        if (err) return console.warn('There was an error while creating the QR code')
        embed.setDescription(`Text QR created with text
\`\`\`\n${QR}\`\`\``);
      })

    message.channel.send({
      embeds: [embed]
    })
  }
};