const Discord = require("discord.js");
const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "timeout",
  params: ["user", true, "time", true, "reason", false],
  info: "Bans a member, and sends a dm",

  category: "hidden",
  async execute(message, arguments2, fsh) {
    // temp dev only //
    if (!fsh.devIds.includes(message.author.id)) return;
    // ------------- //
    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    if (!typeof Number(user) == "Number") {
      message.channel.send("Invalid member");
      return;
    }
    user = fsh.client.users.cache.get(user) || 0;
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.TimeoutMembers)
    ) {
      message.channel.send("You don't have ban permissions");
      return;
    }
    if (user == 0) {
      message.channel.send("Invalid member");
      return;
    }
    if (!message.guild.members.cache.has(user.id)) {
      message.channel.send("User not in server");
      return;
    }
    if (user.bot) {
      message.channel.send("Cannot timeout bots");
      return;
    }
    try {
      await message.guild.members.fetch(user.id).timeout(arguments2[1], {
        reason: arguments2.slice(2, arguments2.length).join(" "),
      });
      message.channel.send("ultra beta timeout message: success");
    } catch {
      message.channel.send("Couldn't timeout");
    }
  },
};
