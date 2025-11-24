const Discord = require('discord.js');
const UserCheck = require('../../user-check.js');

module.exports = {
  name: "scan",
  info: "Scans server to check problems",
  category: "admin",

  async execute(message, arguments2, fsh) {
    let susMem = {};
    message.guild.members.cache.forEach(m=>susMem[m.id]=UserCheck(m.user, m));
    let sortable = Object.entries(susMem);
    sortable = sortable
      .sort((a,b)=>a[1]-b[1])
      .reverse()
      .filter(e => e[1] != 0)
      .map(e => `${e[1]>10?'⚠️':''}${message.guild.members.cache.get(e[0]).displayName} (<@${e[0]}>) - ${e[1]}`);

    let a = '';
    let repeat_end = Math.min(Math.max(sortable.length, 0), 20);
    for (let count = 0; count < repeat_end; count++) {
      a = `${a}${count}. ${sortable[count]}\n`;
    }

    let DangerPerms = [2n,4n,16n,32n,8192n,131072n,524288n,268435456n,536870912n,1073741824n,1073741824n,8589934592n,17179869184n,1099511627776n,2199023255552n];

    let b = [];
    message.guild.roles.cache.forEach(async r => {
      let yu = [];
      DangerPerms.forEach(t => {
        if (r.permissions.has(t)) {
          for (let key in Discord.PermissionsBitField.Flags) {
            if (Discord.PermissionsBitField.Flags[key] == t) {
              yu.push(key);
              continue;
            }
          }
        }
      })
      if (yu.length > 0) {
        if (r.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
          b.unshift(`<@&${r.id}> - All`);
        } else {
          b.push(`<@&${r.id}> - ${yu.join(', ')}`);
        }
      }
    })

    let c = [];
    message.guild.members.cache.forEach(async r => {
      let yu = [];
      DangerPerms.forEach(t => {
        if (r.permissions.has(t)) {
          for (let key in Discord.PermissionsBitField.Flags) {
            if (Discord.PermissionsBitField.Flags[key] == t) {
              yu.push(key);
              continue;
            }
          }
        }
      })
      if (yu.length > 0) {
        if (r.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
          c.unshift(`<@${r.id}> - All`);
        } else {
          c.push(`<@${r.id}> - ${yu.join(', ')}`);
        }
      }
    })

    let news = {};
    message.guild.members.cache.forEach(m=>news[m.user.id]=m.joinedAt);
    let snew = Object.entries(news)
      .sort((a,b)=>b[1]-a[1])
      .slice(0,15)
      .map(m=>{
        let mem = message.guild.members.cache.get(m[0]);
        let scr = UserCheck(mem.user, mem);
        return `<@${m[0]}> - ${scr}`;
      })
      .join('\n');

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.admin} Security scan`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor('#888888')
      .setDescription(`Fsh security scan ${fsh.emojis.admin}`)
      .addFields(
        {
          name: `Roles with dangerous permissions (${b.length})`,
          value: b ? `Rol | Permission\n${b.slice(0,18).join("\n").slice(0,950)}\n${b.slice(0,15).length != b.length ? `[${b.length-15} more]`:""}` : "No roles with dangerous permisions found",
          inline: true
        },
        {
          name: `Users with dangerous permissions (${c.length})`,
          value: c ? `User | Permission\n${c.slice(0,18).join("\n").slice(0,950)}\n${c.slice(0,20).length != c.length ? `[${c.length-20} more]`:""}` : "No users with dangerous permisions found",
          inline: true
        },
        {
          name: 'Joins',
          value: snew,
          inline: true
        },
        {
          name: `Suspicious users (${sortable.length})`,
          value: a ? `Pos | User | Rating\n${a}` : "No users with a rating found"
        }
      );

    message.channel.send({
      embeds: [embed]
    });
  }
};