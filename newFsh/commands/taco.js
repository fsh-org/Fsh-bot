/* This is a easter egg
don't ruin the fun by looking at what it does in code
just use the file name as a hint
*/

const Discord = require("discord.js");

module.exports = {
  name: ["taco","tacos"],
  category: "hidden",

  async execute(message, arguments2, fsh) {
    message.reply("[It's raining tacos, from outa the sky, tacos, no need to ask why, just open your mouth and close your eyes, it's raining tacos](<https://youtu.be/npjF032TDDQ>)")
  }
};