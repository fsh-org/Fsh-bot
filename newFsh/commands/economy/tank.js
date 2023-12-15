const Discord = require("discord.js");

function Good(message, arguments2) {
  if (!arguments2[1]) {
    message.reply("amount required");
    return true;
  }
  if (String(Number(arguments2[1])) == "NaN") {
    message.reply("amount must be a number");
    return true;
  }
  if (Number(arguments2[1]) < 1) {
    message.reply("amount must be 1 or above");
    return true;
  }
  if (Number(arguments2[1]) != Math.floor(Number(arguments2[1]))) {
    message.reply("amount can't be decimal");
    return true;
  }
  return false;
}

module.exports = {
  name: 'tank',
  params: ["action", false, "amount", false],
  info: "Amount of fsh that someone has",

  category: "hidden",
  async execute(message, arguments2, fsh) {
    // temp dev only //
    if (!fsh.devIds.includes(message.author.id)) return;
    // ------------- //

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.economy} Tank`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888");

    let money = fsh.user_fsh.get(message.author.id) || 0;
    let amount = fsh.bank_fsh.get(message.author.id) || 0;
    let max = fsh.bank_limit.get(message.author.id) || 1000;

    if (!arguments2[0]) {
      // Check tank
      let scale = Math.floor(amount/max*10);
      let group = [];
      for (var i = 0; i < (scale); i++) {
        group[i] = fsh.emojis.fsh
      };
      for (var i = scale; i < 10; i++) {
        group[i] = "⬛"
      };
      embed.setDescription(`Your tank: ${amount}/${max}
${group.join("")}
`)
      
    } else if (arguments2[0] == "deposit") {
      if (Good(message, arguments2)) return;
      if (Number(arguments2[1])<=money) {
        embed.setDescription(`s`)
      } else {
        embed.setDescription(`Not enough fsh`)
      }
    } else if (arguments2[0] == "withdraw") {
      if (Good(message, arguments2)) return;
      embed.setDescription(`d`)
    } else {
      embed.setDescription(`Action not found`)
    }
    
    message.channel.send({
      embeds: [embed]
    });
  }
};