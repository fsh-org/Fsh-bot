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
      message.reply(`message must be less than 1950 in length (${letext.length})`)
      return;
    }
    
    let embed = new Discord.EmbedBuilder()
      .setTitle("QR creator")
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: "png" })
      })
      .setImage(`https://chart.googleapis.com/chart?chs=500x500&cht=qr&chld=L&choe=UTF-8&chl=${letext.replaceAll(" ","+")}&h=h`)
      .setDescription(`QR created with text
\`"${letext}"\``);

    message.channel.send({
      embeds: [embed]
    })
  }
};