const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  info: "Bot's ping and some others",
  category: "main",

  async execute(message, arguments2, fsh) {
    var ping = new EmbedBuilder()
      .setTitle(`Fsh ping`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setDescription(`${fsh.emojis.ping} Ping: \`${fsh.client.ws.ping}ms\`
${fsh.emojis.lat} Latency: \`${Date.now() - message.createdTimestamp}ms\``);

    message.channel.send({
      embeds: [ping]
    })
  }
};