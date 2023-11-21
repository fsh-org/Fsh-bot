const Discord = require("discord.js");

module.exports = {
  name: "daily",
  info: "Get daily amount of fsh",
  category: "economy",
  
  async execute(message, arguments2, fsh) {
    if (await fsh.cooldown.get(`${message.author.id}-daily`) > Math.floor(new Date().getTime() / 1000)) {
      message.reply(`you are on cooldown, you can use daily in <t:${await fsh.cooldown.get(`${message.author.id}-daily`)}:R>`);
      return;
    }

    fsh.cooldown.set(`${message.author.id}-daily`, Math.floor(new Date().getTime() / 1000)+(24*60*60))

    let MFsh = Math.floor(Math.random() * 71 + 30);
    let BFsh = 0;
    let Bm = 0;
    fsh.client.guilds.cache.forEach(async (s) => {
      if (s.ownerId == message.author.id) {
        if (Bm < 5) {
          BFsh += Math.floor(Math.random() * 9 + 2);
          Bm += 1;
        }
      }
    });
    
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.economy} Daily`)
      .setDescription(`Recived: ${MFsh} fsh
Server bonus: ${BFsh} ${Bm > 4 ? "[5 max reached]" : ""}

Total: ${MFsh + BFsh} fsh`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setThumbnail(message.member.displayAvatarURL({ format: "png" }))
      .setColor("#888888");

    fsh.user_fsh.add(message.author.id, MFsh+BFsh)
    
    message.channel.send({
      embeds: [embed]
    });
  }
};