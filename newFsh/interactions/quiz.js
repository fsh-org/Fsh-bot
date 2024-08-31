// This just servers to make parham not use quiz at this point

const Discord = require("discord.js")
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  async execute(message) {
    // Is it a embed?
    try {
      if (!message.embeds[0]) return;
      if (!message.embeds[0].data) return;
    } catch (err) {
      return;
    }
    try {
      if (Array.from(message.mentions.users)[0][0] == '899368692301836319') {
        message.delete()
      }
      return;
    } catch (err) {
      return;
    }
  }
}