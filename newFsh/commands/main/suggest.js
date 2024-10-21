const Discord = require("discord.js")

module.exports = {
  name: "suggest",
  slash: true,
  params: [{
    name: 'text',
    type: 'string',
    min: 4,
    max: 120,
    required: true
  }],
  category: "main",

  async execute(interaction, arguments, fsh) {
    let inner = fsh.getInnerLocale(interaction);
    let text = arguments['text'];
    if (text.length < 4) {
      interaction.reply(inner.small);
      return;
    }
    if (text.length > 120) {
      interaction.reply(inner.big);
      return;
    }

    text = await fetch(`https://api.fsh.plus/filter?text=${text}`);
    text = await text.json();
    text = decodeURIComponent(text.censor);

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.envelope} Suggestion`)
      .setDescription(text)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: `${interaction.user.globalName} (${interaction.user.id})`,
        iconURL: interaction.member.displayAvatarURL({ dynamic: true })
      })
      .setColor("#888888");

    fsh.client.channels.cache.get("1117473022878687392").send({
      embeds: [embed]
    })
      .then((suggested) => {
        suggested.react(fsh.emojis.thumbsup);
        suggested.react(fsh.emojis.thumbsdown);
      });

    interaction.reply({
      content: inner.sent,
      ephemeral: true
    });
  }
};