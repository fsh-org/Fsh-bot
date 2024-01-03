// Uh nitro

const Discord = require("discord.js");
const { v4: uuidv4 } = require('uuid');

module.exports = {
  name: "nitro",
  //params: [],
  info: "Info on command",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    // dev only //
    if (!fsh.devIds.includes(message.author.id)) return;
    // ------------- //
    let data = await fetch("https://api.discord.gx.games/v1/direct-fulfillment",{method:"POST",headers:{'content-type':"application/json"},body:'{"partnerUserId": "'+uuidv4()+'"}'});
    data = await data.json();
    message.reply("Your code!\n<https://discord.com/billing/partner-promotions/1180231712274387115/"+data.token+">")
  }
};