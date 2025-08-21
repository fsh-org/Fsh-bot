const Discord = require('discord.js');

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function makeid(characters, length) {
  var result = '';
  var charactersLength = characters.length;
  for (var i = 0; i < Number(length); i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  name: "random",
  params: ['type', false, 'length', false],
  info: "Random of thing",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let embed = new Discord.EmbedBuilder()
      .setTitle(`Random`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor('#888888');

    if (Number(arguments2[1])>2000) {
      message.reply('too long (max 2000)');
      return;
    }

    switch (String(arguments2[0]).toLowerCase()) {
      case null:
      case 'undefined':
      case 'NaN':
      case '':
        embed.setDescription(`List of random:
${shuffle(['- Text - Random letters (a-z,A-Z)','- String - Random letters and numbers (a-z,A-Z,0-9)','- Number - Random number (0-9)','- Fraction - 0. numbers (0-9)','- Member - Random users on the server','- Channel - Random channels on the server']).join('\n')}`);
        break;
      case 'text':
        embed.setDescription(`Random Text:
\`\`\`
${makeid('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', Number(arguments2[1])||10)}
\`\`\``);
        break;
      case 'string':
        embed.setDescription(`Random String:
\`\`\`
${makeid('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', Number(arguments2[1])||10)}
\`\`\``);
        break;
      case 'number':
        embed.setDescription(`Random Number:
\`\`\`
${makeid('0123456789', Number(arguments2[1])||5)}
\`\`\``);
        break;
      case 'fraction':
        embed.setDescription(`Random Number:
\`\`\`
0.${makeid('0123456789', Number(arguments2[1])||4)}
\`\`\``);
        break;
      case 'member':
        if (Number(arguments2[1])>50) {
          message.reply('too long (max 50)');
          return;
        }
        let mem = [];
        for (i = 0; i < (arguments2[1]||1); i++) {
          let user = message.guild.members.cache.random();
          mem.push(`<@${user.user.id}> - ${user.displayName} (${user.user.id})`)
        }
        embed.setDescription(`Random Member:
${mem.join('\n')}`);
        break;
      case 'channel':
        if (Number(arguments2[1])>50) {
          message.reply('too long (max 50)');
          return;
        }
        let cha = [];
        for (i = 0; i < (arguments2[1]||1); i++) {
          let channel = message.guild.channels.cache.random();
          cha.push(`<#${channel.id}> - ${channel.name} (${channel.id})`)
        }
        embed.setDescription(`Random Member:
${cha.join('\n')}`);
        break;
      default:
        embed.setDescription(`Type not found, leave type empty for list of posibilities`);
    }

    message.channel.send({
      embeds: [embed]
    });
  }
};