const Discord = require("discord.js");

function textToTitleCase(str) {
  return str.replace(/\S+/g, function (txt) {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase();
  });
}
function hexToInt(code){
  return parseInt(code.replace('#',''), 16);
};

module.exports = {
  name: ["amount", "balance", "bal"],
  params: ["member", false],
  info: "Amount of fsh that someone has",
  category: "economy",

  async execute(message, arguments2, fsh) {
    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    user = fsh.client.users.cache.get(user) || message.author;
    let member = message.guild.members.cache.get(user.id);

    let base = new Discord.ContainerBuilder()
      .setAccentColor(hexToInt(member.displayHexColor));

    let pfp = new Discord.ThumbnailBuilder()
      .setURL(user.displayAvatarURL({ format: "png" }))
      .setDescription((user.globalName??user.username)+"'s pfp");

    let desc = new Discord.SectionBuilder()
      .addTextDisplayComponents([
        new Discord.TextDisplayBuilder().setContent(`## ${textToTitleCase(user.displayName)}'${user.displayName.endsWith('s')?'':'s'} balance`),
        new Discord.TextDisplayBuilder().setContent(`${fsh.emojis.net} **${fsh.user_fsh.get(user.id)??0}** fsh in net
${fsh.emojis.tank} **${fsh.bank_fsh.get(user.id)??0}/${fsh.bank_limit.get(user.id)??1000}** fsh in tank

${fsh.emojis.fsh} **${(fsh.user_fsh.get(user.id)??0)+(fsh.bank_fsh.get(user.id)??0)}** total fsh`)
      ])
      .setThumbnailAccessory(pfp);

    base.addSectionComponents([desc]);

    message.channel.send({
      flags: Discord.MessageFlags.IsComponentsV2,
      components: [base],
      allowedMentions: {
        parse: [],
        users: [],
        roles: []
      }
    });
  }
};