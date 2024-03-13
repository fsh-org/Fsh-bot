const Discord = require("discord.js");

module.exports = {
  name: ["s4d", "s4dsearch"],
  params: ["query", true],
  info: "Search for a scratch for discord example",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let data = await fetch('https://s4d-examples.fsh.plus/api/examples');
    data = await data.json();

    let embed = new Discord.EmbedBuilder()
      .setTitle(`S4D search "${arguments2.join(" ")}"`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL({ format: "png" }),
      })
      .setColor("#888888");

      embed.setDescription(Object.keys(data)
        .filter(key => data[key][0].toLowerCase().includes(arguments2.join(" ")))
        .slice(0,8)
        .map(key => `[${data[key][0]}](https://scratch-for-discord.com?exampleid=${data[key][4]}) |\\| Id: ${data[key][4]} |\\| By: ${data[key][6]}
**${fsh.emojis.thumbsup} ${data[key][8]}    ${fsh.emojis.thumbsdown} ${data[key][9]}    ${fsh.emojis.fileimport} ${data[key][10]}    ${fsh.emojis.cube} ${data[key][3]}**
${data[key][1]}
${data[key][7] == "" ? "" : `uploaded to ${data[key][7]}\n`}`,
      )
      .join('\n')
      .slice(0,2048))
    
      message.channel.send({
        embeds: [embed],
      });
  },
};