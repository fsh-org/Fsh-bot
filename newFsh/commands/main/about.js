const Discord = require("discord.js");

module.exports = {
  name: "about",
  slash: true,
  category: "main",

  async execute(interaction, arguments, fsh) {
    let inner = fsh.getInnerLocale(interaction);
    function userin(id) {
      if (interaction.guild.members.cache.has(id)) {
        return `<@${id}>`;
      } else {
        return fsh.client.users.cache.get(id).username;
      }
    }
    
    var embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.fsh} ${inner.about}`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setDescription(`**${inner.links}:**
[${fsh.emojis.website}](https://fsh.plus) [${fsh.emojis.github}](https://github.com/Fsh-org) [${fsh.emojis.discord}](https://discord.gg/SXcXZN4tkM) [ToS](https://fsh.plus/tos) [PP](https://fsh.plus/pp)
${inner.email}: help@fsh.plus

\`${fsh.getLocale(interaction).get('commands.info.name')}\` ${inner.tech}

${inner.created} ${userin("712342308565024818")} ${inner.and} ${userin("816691475844694047")}`)
      .setThumbnail("https://fsh.plus/fsh.gif");

    interaction.reply({
      embeds: [embed]
    })
  }
};