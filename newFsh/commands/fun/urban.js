const Discord = require("discord.js");

module.exports = {
  name: "urban",
  params: ['query', false],
  info: "Search a definition on urban dictionary",
  category: "fun",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      let data = await fetch(`https://api.urbandictionary.com/v0/random`)
      data = await data.json();
      data = data.list[0]
      
      let embed = new Discord.EmbedBuilder()
        .setTitle(`Urban random "${data.word}"`)
        .setURL(data.permalink)
        .setTimestamp()
        .setFooter({ text: `V${fsh.version}` })
        .setColor("#888888")
        .setDescription(`${data.definition.replaceAll(/\[|\]/g, "*")}

**Example:** ${data.example.replaceAll(/\[|\]/g, "*")}

${fsh.emojis.thumbsup} ${data.thumbs_up} ${fsh.emojis.thumbsdown} ${data.thumbs_down}
By: ${data.author} | Created: <t:${Math.floor(new Date(data.written_on)/1000)}:R>`);

      message.channel.send({
        embeds: [embed]
      })
      return;
    }
    let data = await fetch(`https://api.urbandictionary.com/v0/define?term=${arguments2.join("%20")}`)
    data = await data.json();
    
    data = data.list.filter(e => {return e.word.match(new RegExp(arguments2[0],"ig"))}).sort((a,b) => {return a.thumbs_up > b.thumbs_up ? -1 : 1});
    data = data[0]
    
    if (!data) {
      message.reply("not found")
      return;
    }
    if (!data.word) {
      message.reply("not found")
      return;
    }

    let embed = new Discord.EmbedBuilder()
      .setTitle(`Urban "${data.word}"`)
      .setURL(data.permalink)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888")
      .setDescription(`${data.definition.replaceAll(/\[|\]/g, "*")}

**Example:** ${data.example.replaceAll(/\[|\]/g, "*")}

${fsh.emojis.thumbsup} ${data.thumbs_up} ${fsh.emojis.thumbsdown} ${data.thumbs_down}
By: ${data.author} | Created: <t:${Math.floor(new Date(data.written_on)/1000)}:R>`);

    message.channel.send({
      embeds: [embed]
    })
  }
};