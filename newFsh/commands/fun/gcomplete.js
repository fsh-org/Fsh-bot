const Discord = require("discord.js");

module.exports = {
  name: "gcomplete",
  slash: true,
  params: [{
    name: 'query',
    type: 'string',
    min: 1,
    max: 100,
    required: true
  }],
  category: "fun",

  async execute(interaction, arguments, fsh) {
    let inner = fsh.getInnerLocale(interaction);
    let data = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${arguments['query']}`);
    data = await data.json();

    var embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.google} ${inner.title} "${arguments['query']}"`)
      .setDescription('1. '+data[1].join("\n2. "))
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ format: "png" }),
      })
      .setColor("#888888");

    interaction.reply({
      embeds: [embed]
    });
  }
};