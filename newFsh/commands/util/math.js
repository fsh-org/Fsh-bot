const Discord = require("discord.js");
const Mexp = require("math-expression-evaluator");

module.exports = {
  name: "math",
  params: ['expression', true],
  info: "Info on command",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    const mexp = new Mexp()
    let res;
    try {
      res = String(mexp.eval(arguments2.join(" ")));
    } catch (err) {
      res = 'invalid expression'
    }
    message.reply(res)
  }
};