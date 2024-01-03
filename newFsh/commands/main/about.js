const Discord = require("discord.js");

module.exports = {
  name: "about",
  info: "About fsh",
  category: "main",

  async execute(message, arguments2, fsh) {
    function userin(id) {
      if (message.guild.members.cache.has(id)) {
        return `<@${id}>`;
      } else {
        return fsh.client.users.cache.get(id).username;
      }
    }
    
    var embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.fsh} About fsh`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setDescription(`***F**ree **S**ecure **H**igh-quality*

**Links:**
[${fsh.emojis.website}](https://fsh.plus) [${fsh.emojis.github}](https://github.com/Fsh-org) [${fsh.emojis.discord}](https://discord.gg/SXcXZN4tkM) [ToS](https://fsh.plus/tos) [PP](https://fsh.plus/pp)
Help email: help@fsh.plus

\`info\` Technical info | \`credits\` People that helped

Created and maintained by ${userin("712342308565024818")} and ${userin("816691475844694047")}`)
      .setThumbnail("https://fsh.plus/fsh.png");

    message.channel.send({
      embeds: [embed]
    })
  }
};