const Discord = require("discord.js");

module.exports = {
  name: "bots",
  info: "All bots in server",
  category: "admin",

  async execute(message, arguments2, fsh) {
    let verified = []
    let botList = []
    message.guild.members.cache.forEach(m => {
      if ((m).user.bot) {
        if ((m).user.flags.has(65536)) {
          verified.push(m);
        } else {
          botList.push(m);
        }
      }
    })
    botList = botList.sort((a,b) => {return a.displayName.toString().toLowerCase() > b.displayName.toString().toLowerCase() ? 1 : -1})
    
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.admin} All bots (${verified.length + botList.length})`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888")
      .setDescription(`**Verified** (${verified.length})\n${verified.join(', ')}\n**Non verified** (${botList.length})\n${botList.join(', ')}`);

    message.channel.send({
      embeds: [embed]
    });
  }
};