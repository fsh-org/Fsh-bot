const Discord = require("discord.js");

module.exports = {
  name: ["give", "pay", "gift"],
  params: ["member", true, "amount", true],
  info: "Give someone fsh",

  category: "economy",
  async execute(message, arguments2, fsh) {
    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    if (!typeof Number(user) == "Number") {
      message.channel.send("please mention someone");
      return;
    }
    user = fsh.client.users.cache.get(user);
    if (!user) {
      message.channel.send("user does not exist / or hasn't been cached");
      return;
    }
    if (String(Number(arguments2[1])) == "NaN") {
      message.channel.send("amount needs to be number");
      return;
    }
    if (Number(arguments2[1]) < 1) {
      message.channel.send("amount can't be negative");
      return;
    }
		//	Could just Math.floor()...
    //	still user would be like: why didn't decimal part get sent
		//	ok
    //	wait am i dumb or did i not understand
		//	i was saying both ways
    if (Number(arguments2[1]) != Math.floor(Number(arguments2[1]))) {
      message.channel.send("amount can't have decimals");
      return;
    }
    if (message.member.user == user) {
      message.channel.send(
        "you gave yourself money, don't think that is how it works"
      );
      return;
    }
    if (user.id == "1068572316986003466") {
      message.channel.send("for me... wow thanks but i will need to decline");
      return;
    }
    if (user.id == "912745278187126795") {
      message.channel.send(";) maybe later");
      return;
    }
    if (user.bot) {
      message.channel.send("don't think it needs it");
      return;
    }
    if (fsh.user_fsh.get(message.member.user.id) < arguments2[1]) {
      message.channel.send("you can't pay more than you have");
      return;
    }
    fsh.user_fsh.subtract(message.member.user.id, Number(arguments2[1]));
    fsh.user_fsh.add(user.id, Number(arguments2[1]));

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.economy} Give / Pay`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: "png" }),
      })
      .setThumbnail(user.displayAvatarURL({ format: "png" }))
      .setColor("#888888")
      .setDescription(
        `${message.member} gave <@${user.id}> ${arguments2[1]} fsh`
      );
    message.channel.send({
      embeds: [embed],
    });
  },
};
