module.exports = {
  name: "eat",
  slash: true,
  category: "fun",

  async execute(interaction, arguments, fsh) {
    let inner = fsh.getInnerLocale(interaction);
    interaction.reply(inner[Math.floor(Math.random() * 9).toString()]);
  }
};