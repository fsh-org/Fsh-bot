const Discord = require("discord.js");
const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "ban",
  params: ["user", true, "dm y/n", false, "reason", false],
  info: "Bans a member, and sends a dm",

  category: "hidden",
  async execute(message, arguments2, fsh) {
    // temp dev only //
    if (!fsh.devIds.includes(message.author.id)) return;
    // ------------- //
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      message.channel.send("You don't have ban permissions");
      return;
    }
    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    if (Number.isNaN(Number(user))) {
      message.channel.send('invalid user');
      return;
    }
    if (arguments2[1] == "y") {
      user.send({
        content: String(arguments2.slice(2, arguments2.length).join(" ")),
      });
    }
    try {
      await message.guild.members.ban(user, {
        reason: arguments2.slice(2, arguments2.length).join(" "),
      });
      let name = 'unknow user';
      let dis = '';
      try {
        let use = await fsh.client.users.fetch(user);
        name = use.globalName??use.username;
        dis = (use.discriminator.length>1?'#'+use.discriminator:'');
      } catch(err) { /* Ignore */ }
      message.reply(`banned ${name}${dis}`);
    } catch(err) {
      console.log('Ban error', err);
      message.reply('could not ban');
    }
  }
};