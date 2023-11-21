const Discord = require("discord.js");

module.exports = {
  name: "animal",
  params: ["animal", false],
  info: "Get random image of a animal",
  category: "fun",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      let tu = await fetch(`https://api.fsh.plus/animal`)
      tu = await tu.text()
      var embed = new Discord.EmbedBuilder()
        .setTitle(`Animal list`)
        .setFooter({ text: `V${fsh.version}` })
        .setTimestamp(new Date())
        .setColor("#999999")
        .setAuthor({
          name: message.member.user.username,
          iconURL: message.member.user.displayAvatarURL({ format: "png" })
        })
        .setDescription(tu.replaceAll("<br>","\n"));

      message.channel.send({
        embeds: [embed]
      })
      return;
    }
    let tu = await fetch(`https://api.fsh.plus/animal?animal=${arguments2[0]}`)
    tu = await tu.json()
    if (tu.error) {
      message.reply("animal not found");
      return;
    }

    var embed = new Discord.EmbedBuilder()
      .setTitle(`Animal ${arguments2[0]}`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: "png" })
      })
      .setImage(tu.image);

    message.channel.send({
      embeds: [embed]
    })
  }
};