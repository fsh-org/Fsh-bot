const Discord = require("discord.js");

let userin = (id, message, fsh)=>message.guild.members.cache.has(id)?`<@${id}>`:(fsh.client.users.cache.has(id)?fsh.client.users.cache.get(id).username:'unknown');

function global(db, message, fsh) {
  let unsortedLevels = db.all()
  let levels = unsortedLevels
    .sort((level1, level2) => level1.data - level2.data)
    .reverse()
    .filter(level => {return level.data > 0})
    .map(level => (`${level.data} - ${userin(level.key, message, fsh)}`));
  a = "";
  var repeat_end = Math.min(Math.max(levels.length, 1), 10);
  for (var count = 0; count < repeat_end; count++) {
    a = `${a}**${count+1 > 3 ? count+1 : ["🏆","🥈","🥉"][count]}.** ${levels[count]}\n`;
  }
  return a;
}
function local(db, message, fsh) {
  let unsortedLevels = []
  let fshDb = db.all();
  for (let i in fshDb) {
    if(typeof(message.guild.members.cache.get(fshDb[i]["key"])) != 'undefined') {
      unsortedLevels.push(fshDb[i])
    }
  }
  levels = unsortedLevels
    .sort((level1, level2) => level1.data - level2.data)
    .reverse()
    .filter(level => {return level.data > 0})
    .map(level => (`${level.data} - ${userin(level.key, message, fsh)}`));
  a = "";
  var repeat_end = Math.min(Math.max(levels.length, 1), 10);
  for (var count = 0; count < repeat_end; count++) {
    a = `${a}**${count+1 > 3 ? count+1 : ["🏆","🥈","🥉"][count]}.** ${levels[count]}\n`;
  }
  return a;
}
function total(db) {
  let y = 0
  Object.keys(db.data).forEach(async key => {
    y = y + Number(db.get(key))
  })
  return y;
}

module.exports = {
  name: ["leaderboard", "lb", "top"],
  info: "Fsh leaderboards",

  category: "economy",
  async execute(message, arguments2, fsh) {
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.economy} Leaderboard`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: message.member.displayName,
        iconURL: message.member.user.displayAvatarURL({ format: "png" }),
      })
      .setColor("#888888");

    embed.addFields({
      name: `${fsh.emojis.net} Net global`,
      value: global(fsh.user_fsh, message, fsh),
      inline: true
    })
    embed.addFields({
      name: `${fsh.emojis.net} Net local`,
      value: local(fsh.user_fsh, message, fsh),
      inline: true
    })
    embed.addFields({
      name: `${fsh.emojis.fsh} Total (${String(total(fsh.user_fsh)+total(fsh.bank_fsh))})`,
      value: `${fsh.emojis.net} ${String(total(fsh.user_fsh))} fsh in net**  |  **${fsh.emojis.tank} ${String(total(fsh.bank_fsh))} fsh in tank`,
      inline: false
    })
    embed.addFields({
      name: `${fsh.emojis.tank} Tank global`,
      value: global(fsh.bank_fsh, message, fsh),
      inline: true
    })
    embed.addFields({
      name: `${fsh.emojis.tank} Tank local`,
      value: local(fsh.bank_fsh, message, fsh),
      inline: true
    })

    message.channel.send({
      embeds: [embed],
    });
  }
};