const Discord = require("discord.js");
const crypto = require("crypto");

module.exports = {
  name: ['coupon', 'redeem'],
  params: ['code', true],
  info: "Redeem a coupon",
  category: "economy",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply("a code is required")
      return;
    }

    let dd = crypto.createHash('sha256').update(message.content.split(' ')[1]).digest();
    dd = String(dd)

    if (fsh.coupon.has(dd)) {
      message.reply('coupon redeemed (200 fsh) by '+fsh.coupon.get(dd))
      fsh.coupon.delete(dd)
      fsh.user_fsh.add(message.author.id, 200)
    } else {
      message.reply('not valid')
    }
  }
};