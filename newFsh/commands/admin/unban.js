const Discord = require("discord.js");
const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "unban",
  params: ["user", true, "dm y/n", false, "reason", false],
  info: "Unbans a member, and sends a dm",

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
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      message.channel.send("You don't have ban permissions");
      return;
    }
    if (user == 0) {
      message.channel.send("Invalid member");
      return;
    }
    if (message.guild.members.cache.has(user.id)) {
      message.channel.send("User in server");
      return;
    }
    if (user.bot) {
      message.channel.send("Cannot ban bots");
      return;
    }
    if (arguments2[1] == "y") {
      user.send({
        content: String(arguments2.slice(2, arguments2.length).join(" ")),
      });
    }
    try {
      await message.guild.members.unban(user.id, {
        reason: arguments2.slice(2, arguments2.length).join(" "),
      });
      message.channel.send("ultra beta unban message: success");
    } catch {
      message.channel.send("Couldn't unban");
    }
  },
};
