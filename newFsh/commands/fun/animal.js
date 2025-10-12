const Discord = require("discord.js");

module.exports = {
  name: 'animal',
  slash: true,
  params: [{
    name: 'animal',
    type: 'string',
    choices: [
      { name: 'Alpaca', value: 'alpaca' },
      { name: 'Bird', value: 'bird' },
      { name: 'Bunny', value: 'bunny' },
      { name: 'Cat', value: 'cat' },
      { name: 'Dog', value: 'dog' },
      { name: 'Duck', value: 'duck' },
      { name: 'Fish', value: 'fish' },
      { name: 'Fox', value: 'fox' },
      { name: 'Frog', value: 'frog' }
    ],
    required: true
  }],
  category: 'fun',

  async execute(interaction, arguments, fsh) {
    let inner = fsh.getInnerLocale(interaction);
    let tu = await fetch(`https://api.fsh.plus/animal?animal=${arguments.animal}`);
    tu = await tu.json();
    if (tu.error||!tu.image) {
      interaction.reply({ content: inner.notfound, flags: Discord.MessageFlags.Ephemeral });
      return;
    }

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${inner.animal} ${inner[arguments.animal]}`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor('#888888')
      .setAuthor({
        name: interaction.member.user.username,
        iconURL: interaction.member.user.displayAvatarURL({ format: "png" })
      })
      .setImage(tu.image);

    interaction.reply({
      embeds: [embed]
    });
  }
};