const Discord = require("discord.js");

module.exports = {
  name: "roles",
  info: "All roles",
  category: "utility",

  async execute(message, arguments2, fsh) {
    let roles = [];
    let list = "";
    roles = Array.from(message.guild.roles.cache).sort((a,b)=>{return -(Number(a[1].rawPosition)-Number(b[1].rawPosition))});
    roles.slice(0,100).forEach(rol => {
      list = list + `<@&${rol[0]}> `;
    })
    if (roles.length != roles.slice(0,100).length) {
      list = list + `[${roles.length - roles.slice(0,100).length} more]`
    }

    let most = 0;
    let who = '0';
    message.guild.members.cache.forEach(m => {
      if (m.roles.cache.size>most) {
        most = m.roles.cache.size;
        who = m.user.id;
      }
    })

    var embed = new Discord.EmbedBuilder()
      .setTitle(`Server roles (${message.guild.roles.cache.size})`)
      .setFooter({
        text: `V${fsh.version}`
      })
      .setTimestamp(new Date())
      .setColor('#888888')
      .setDescription(list)
      .addFields({
        name: 'Most roles',
        value: `<@${who}> has the most roles with ${most} (${Math.floor(most/message.guild.roles.cache.size*1000)/10}%)`
      });

    message.channel.send({
      embeds: [embed]
    })
  }
};