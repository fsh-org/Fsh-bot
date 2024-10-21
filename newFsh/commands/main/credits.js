const Discord = require("discord.js");

module.exports = {
  name: "credits",
  info: "Bot credits",
  category: "main",

  async execute(interaction, arguments, fsh) {
    function userin(id) {
      if (interaction.guild.members.cache.has(id)) {
        return `<@${id}>`;
      } else {
        return fsh.client.users.cache.get(id).username;
      }
    }
    var credits = new Discord.EmbedBuilder()
      .setTitle("Credits")
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setDescription(`Created and maintained by ${userin("712342308565024818")} and ${userin("816691475844694047")}\n(note: field below icludes devs even if not shown)`)
      .addFields(
        {
          name: "Code / Features",
          value: `> ${userin("439788095483936768")} [${fsh.emojis.github}](https://github.com/maxy-dev)
> ${userin("767102460673916958")} [${fsh.emojis.youtube}](https://www.youtube.com/channel/UC8WiOgf5AGwTQ5bLJ5ya8og) [${fsh.emojis.website}](https://hitbyathunder.xyz/)
> ${userin("860531746294726736")}`,
          inline: true
        },
        {
          name: "Website",
          value: `> ${userin("750565290009559112")}`,
          inline: true
        },
        {
          name: "Art",
          value: `> ${userin("486289392302817300")}`,
          inline: true
        },
        {
          name: "Bot partners",
          value: `Commands or features that are only available when certain bots are on the server
> :link: Link Embedder [${fsh.emojis.link}](https://discord.com/oauth2/authorize?client_id=1132729065980297296&permissions=536996864&scope=bot%20applications.commands)
> :game_die: s4d economy`,
          inline: false
        }
      );

    interaction.reply({
      embeds: [credits]
    });
  }
};