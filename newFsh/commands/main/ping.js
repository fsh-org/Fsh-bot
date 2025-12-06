const Discord = require("discord.js");

module.exports = {
  name: "ping",
  slash: true,
  category: "main",

  async execute(interaction, arguments, fsh) {
    let inner = fsh.getInnerLocale(interaction);
    let ping = new Discord.EmbedBuilder()
      .setTitle(inner.ping)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor('#888888')
      .setDescription(`${fsh.emojis.ping} ${inner.ping}: \`${fsh.client.ws.ping}ms\`
${fsh.emojis.lat} ${inner.latency}: \`${Date.now() - interaction.createdTimestamp}ms\``);

    interaction.reply({
      embeds: [ping]
    });
  }
};