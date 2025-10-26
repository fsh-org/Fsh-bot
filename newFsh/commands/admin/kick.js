const Discord = require("discord.js");

module.exports = {
  name: "kick",
  params: ["user", true, "dm y/n", false, "reason", false],
  info: "Kicks a member, and sends a dm",

  category: "hidden",
  async execute(message, arguments2, fsh) {
    // temp dev only //
    if (!fsh.devIds.includes(message.author.id)) return;
    // ------------- //
    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    if (typeof Number(user) !== "number") {
      message.channel.send("Invalid member");
      return;
    }
    user = fsh.client.users.cache.get(user) || 0;
    if (
      !message.member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)
    ) {
      message.channel.send("You don't have kick permissions");
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
      message.channel.send("Cannot kick bots");
      return;
    }
    if (arguments2[1] == "y") {
      user.send({
        content: String(arguments2.slice(2, arguments2.length).join(" ")),
      });
    }
    try {
      await message.guild.members.kick(user.id, {
        reason: arguments2.slice(2, arguments2.length).join(" "),
      });
      message.channel.send("ultra beta kick message: success");
    } catch {
      message.channel.send("Couldn't kick");
    }
  }
};