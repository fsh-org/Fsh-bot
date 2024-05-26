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
  info: "Tank actions",
  category: "economy",
  
  async execute(message, arguments2, fsh) {
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.tank} Tank`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888");

    let money = fsh.user_fsh.get(message.author.id) || 0;
    let amount = fsh.bank_fsh.get(message.author.id) || 0;
    let max = fsh.bank_limit.get(message.author.id) || 1000;

    if (!arguments2[0]) {
      // Check tank
      let scale = Math.floor(amount/max*Math.round(10+(max/10000)));
      let group = [];
      for (var i = 0; i < (scale); i++) {
        let em = '🐟,🐠,🐡,🐙,🦑,🪼,🦐'.split(',')
        group[i] = Math.random()*100<1?'<a:smugdance:1136293973279912007>':em[Math.floor(Math.random()*em.length)]
      };
      for (var i = scale; i < Math.round(10+(max/10000)); i++) {
        group[i] = "⬛"
      };
      embed.setDescription(`Your tank: ${amount}/${max}
${group.join("")}

**Actions**
- Deposit - Insert fsh into the tank
- Withdraw - Take back fsh from the tank
- Expand/Upgrade - Make your tank bigger (1:1 ratio, 100 fsh tax)`)
      
    } else if (arguments2[0] == "deposit") {
      if (Good(message, arguments2)) return;
      if (Number(arguments2[1])<=money) {
        if (Number(arguments2[1])+amount<=max) {
          fsh.bank_fsh.add(message.author.id, Number(arguments2[1]))
          fsh.user_fsh.subtract(message.author.id, Number(arguments2[1]))
          embed.setDescription(`Deposited ${arguments2[1]}`)
        } else {
          embed.setDescription(`Not enough space`)
        }
      } else {
        embed.setDescription(`Not enough fsh`)
      }
    } else if (arguments2[0] == "withdraw") {
      if (Good(message, arguments2)) return;
      if (Number(arguments2[1])<=amount) {
        fsh.bank_fsh.subtract(message.author.id, Number(arguments2[1]))
        fsh.user_fsh.add(message.author.id, Number(arguments2[1]))
        embed.setDescription(`Withdrawn ${arguments2[1]}`)
      } else {
        embed.setDescription(`Not enough fsh in tank`)
      }
    } else if (arguments2[0] == "expand" || arguments2[0] == "upgrade") {
      if (Good(message, arguments2)) return;
      if (money>=Number(arguments2[1])+100) {
        fsh.bank_limit.add(message.author.id, Number(arguments2[1]));
        fsh.user_fsh.subtract(message.author.id, Number(arguments2[1])+100);
        embed.setDescription('Expanded tank')
      } else {
        embed.setDescription('Not enough money')
      }
    } else {
      embed.setDescription(`Action not found`)
    }
    
    message.channel.send({
      embeds: [embed]
    });
  }
};