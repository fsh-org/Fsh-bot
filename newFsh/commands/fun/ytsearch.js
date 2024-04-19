const Discord = require("discord.js");

module.exports = {
  name: "ytsearch",
  params: ["query", true],
  info: "Search for a youtube video",
  category: "fun",
  async execute(message, arguments2, fsh) {
    let dat = await fetch(`https://api.fsh.plus/ytsearch?query=${arguments2.join("%20")}`);
    dat = await dat.json();
    dat = dat.videos;
    
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.youtube} YouTube search "${arguments2.join(" ")}"`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: message.member.displayName,
        iconURL: message.author.displayAvatarURL({ format: "png" }),
      })
      .setColor("#888888");

    dat.slice(0,5).forEach((element) => {
      embed.addFields({
        name: `${element.title.replaceAll(/#[a-zA-Z0-9]{1,10}/g, '').trim()} || By: ${element.author.name} - ${element.timestamp}`,
        value: `Views: ${element.views} | Uploaded: ${element.ago} | [Link](${element.url})\n${element.description.replaceAll(/#[a-zA-Z0-9]{1,10}/g, '').replaceAll(/(http|https):\/\/.{2,15}\..{2,6}[a-zA-Z0-9\/\-_:]+? /g, '').trim()}`,
      });
    });
    
    message.channel.send({
      embeds: [embed]
    });
  }
};