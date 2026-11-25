const Discord = require('discord.js');

module.exports = {
  name: ['give', 'pay', 'gift'],
  params: ['member', true, 'amount', true],
  info: 'Give someone fsh',
  category: 'economy',

  async execute(message, arguments2, fsh) {
    let user = String(arguments2[0]).replace(/<@/g, '').replace(/>/g, '');
    user = fsh.client.users.cache.get(user);
    if (!user) {
      message.channel.send("user does not exist / or hasn't been cached");
      return;
    }
    let amount = Number(arguments2[1]);
    if (Number.isNaN(amount) || !Number.isFinite(amount)) {
      message.channel.send('amount needs to be number');
      return;
    }
    if (amount<1) {
      message.channel.send('needs to at least be 1');
      return;
    }
    // Could just Math.floor()...
    // still user would be like: why didn't decimal part get sent
    // ok
    // wait am i dumb or did i not understand
    // i was saying both ways
    if (amount !== Math.floor(amount)) {
      message.channel.send("amount can't have decimals");
      return;
    }
    if (message.author.id === user) {
      message.channel.send("you gave yourself money, don't think that is how it works");
      return;
    }
    if (user.id == '1068572316986003466') {
      message.channel.send('for me... wow thanks but i will need to decline');
      return;
    }
    if (user.bot) {
      message.channel.send("don't think it needs it");
      return;
    }
    if (fsh.user_fsh.get(message.member.user.id) < amount) {
      message.channel.send("you can't pay more than you have");
      return;
    }
    fsh.user_fsh.subtract(message.member.user.id, amount);
    fsh.user_fsh.add(user.id, amount);

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.economy} Give / Pay`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: 'png' }),
      })
      .setThumbnail(user.displayAvatarURL({ format: 'png' }))
      .setColor('#888888')
      .setDescription(`${message.member} gave <@${user.id}> ${amount} fsh`);

    message.channel.send({ embeds: [embed] });
  }
};