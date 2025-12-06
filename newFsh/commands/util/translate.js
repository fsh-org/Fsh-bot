const Discord = require("discord.js");

module.exports = {
  name: 'translate',
  slash: true,
  params: [{
    name: 'text',
    type: 'string',
    max: 250,
    min: 1,
    required: true
  },{
    name: 'lang',
    type: 'string',
    max: 6,
    min: 2,
    required: true
  }],
  category: 'utility',

  async execute(interaction, arguments, fsh) {
    let inner = fsh.getInnerLocale(interaction);

    let letext = await fetch(`https://api.fsh.plus/filter?text=${encodeURIComponent(arguments.text)}&char=*`);
    letext = await letext.json();

    fetch(`https://api.fsh.plus/translate?lang=${arguments.language}&text=${encodeURIComponent(letext.censor)}`)
      .then(res=>res.json())
      .then(res=>{
        let embed = new Discord.EmbedBuilder()
          .setTitle(inner.translate)
          .setFooter({ text: `V${fsh.version}` })
          .setTimestamp(new Date())
          .setColor('#888888')
          .setDescription(`${res.source}:
${letext.censor}

${arguments.language}:
${res.text}`);

        interaction.reply({
          embeds: [embed]
        });
      })
      .catch(_=>{
        message.reply({
          content: inner.error,
          flags: Discord.MessageFlags.Ephemeral
        });
      });
  }
};