const Discord = require("discord.js");

module.exports = {
  name: "bots",
  info: "All bots in server",
  category: "admin",

  async execute(message, arguments2, fsh) {
    let botList = []
    message.guild.members.cache.forEach(m => {
      if ((m).user.bot) botList.push(m);
    })
    botList = botList.sort((a,b) => {return a.displayName.toString().toLowerCase() > b.displayName.toString().toLowerCase() ? 1 : -1})
    
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.admin} All bots (${botList.length})`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888")
      .setDescription(botList.join(", "));

    message.channel.send({
      embeds: [embed]
    });
  }
};