const Discord = require("discord.js")

module.exports = {
  name: "suggest",
  params: ["thing", true],
  info: "Suggest features to be added",
  category: "main",
  async execute(message, arguments2, fsh) {
    if (!arguments.length) {
      message.channel.send({
        content: "Please actually suggest something to send"
      });
      return;
    }
    let text = await fetch(`https://api.fsh.plus/filter?text=${message.content.split(' ').slice(0, message.content.split(' ').length-1).join(' ').replaceAll(" ","%20")}`);
    text = await text.json();
    text = text.censor.replaceAll("%20"," ")
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.envelope} Suggestion`)
      .setDescription(text)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: `${message.member.user.username} (${message.author.id})`,
        iconURL: message.member.user.displayAvatarURL({ format: "png" }),
      })
      .setColor("#888888");
    fsh.client.channels.cache.get("1117473022878687392").send({
      embeds: [embed]
    }).then((suggested) => {
      suggested.react(fsh.emojis.thumbsup);
      suggested.react(fsh.emojis.thumbsdown);
    });
    message.channel.send({
      content: "suggestion sent",
    });
  },
};
