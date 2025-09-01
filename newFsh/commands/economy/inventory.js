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
  name: ["inventory", "inv"],
  params: ['user', false],
  info: "View your or others items",
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

    let inv = fsh.user_inventory.get(user.id) || {};
    let desc = new Discord.SectionBuilder()
      .addTextDisplayComponents([
        new Discord.TextDisplayBuilder().setContent(`## ${textToTitleCase(user.displayName)}'${user.displayName.endsWith('s')?'':'s'} inventory`),
        new Discord.TextDisplayBuilder().setContent(Object.keys(inv).map(item=>`- ${inv[item]}x ${fsh.items.get(item).name} ${fsh.emojis[fsh.items.get(item).emoji]??''}
  - ${fsh.items.get(item).desc}`).join('\n')||'No items')
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