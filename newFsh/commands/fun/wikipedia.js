const Discord = require('discord.js');

module.exports = {
  name: 'wikipedia',
  slash: true,
  params: [{
    name: 'page',
    type: 'string',
    max: 100,
    min: 1,
    required: true
  },{
    name: 'lang',
    type: 'string',
    max: 6,
    min: 2,
    required: false
  }],
  category: 'fun',

  async execute(interaction, args, fsh) {
    let inner = fsh.getInnerLocale(interaction);

    let data = await fetch(`https://api.fsh.plus/wikipedia?page=${encodeURIComponent(args.page)}&lang=${encodeURIComponent(args.language||'en')}`);
    data = await data.json();

    if (data.err) {
      interaction.reply({
        content: inner.fail,
        flags: Discord.MessageFlags.Ephemeral
      });
      return;
    }

    let embed = new Discord.EmbedBuilder()
      .setTitle(`Wikipedia: ${data.title}`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor('#888888')
      .setDescription(data.data.slice(0, 3596)+`...\n**${inner.full} [wikipedia](https://${data.lang}.wikipedia.com/wiki/${data.title.replaceAll(' ', '_')})**`);

    if (data.img&&data.img.length) embed.setThumbnail(data.img);

    interaction.reply({
      embeds: [embed]
    });
  }
};