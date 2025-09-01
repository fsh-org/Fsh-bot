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
  name: "profile",
  params: ["member", false],
  info: "Shows the economy profile of someone",
  category: "economy",

  async execute(message, arguments2, fsh) {
    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    user = fsh.client.users.cache.get(user) || message.author;
    let member = message.guild.members.cache.get(user.id);

    let badges = (fsh.user_badges.get(user.id)??[])
      .map(id=>fsh.badges.get(id))
      .map(b=>`${fsh.emojis[b.emoji]} ${b.name}`);

    let base = new Discord.ContainerBuilder()
      .setAccentColor(hexToInt(member.displayHexColor));

    let pfp = new Discord.ThumbnailBuilder()
      .setURL(user.displayAvatarURL({ format: "png" }))
      .setDescription((user.globalName??user.username)+"'s pfp");

    let desc = new Discord.SectionBuilder()
      .addTextDisplayComponents([
        new Discord.TextDisplayBuilder().setContent(`## ${textToTitleCase(user.displayName)}'${user.displayName.endsWith('s')?'':'s'} economy profile`),
        new Discord.TextDisplayBuilder().setContent(`${badges.join(' ')}

${fsh.emojis.net} **${fsh.user_fsh.get(user.id)??0}** in net  |  ${fsh.emojis.tank} **${fsh.bank_fsh.get(user.id)??0}** in tank
-# \`fsh!bal\` for more info`)
      ])
      .setThumbnailAccessory(pfp);

    base.addSectionComponents([desc]);

    let inv = fsh.user_inventory.get(user.id)??{};
    base.addTextDisplayComponents([new Discord.TextDisplayBuilder()
      .setContent(`## Inventory
${Object.keys(inv).map(item=>`${inv[item]}x ${fsh.items.get(item).name} ${fsh.emojis[fsh.items.get(item).emoji]??''}`).join(' ')||'No items'}
-# \`fsh!inv\` for more info`)]);

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