const Discord = require("discord.js");

function colourRandom() {
  var num = Math.floor(Math.random() * Math.pow(2, 24));
  return "#" + ("00000" + num.toString(16)).substr(-6);
}

module.exports = {
  name: "help",
  info: "This thing",
  category: "main",
  async execute(message, arguments2, fsh) {
    /* -- Buttons -- */
    const website = new Discord.ButtonBuilder()
      .setLabel("Bot website")
      .setURL("https://fsh-bot.frostzzone.repl.co")
      .setStyle(Discord.ButtonStyle.Link);
    const invite = new Discord.ButtonBuilder()
      .setLabel("Invite")
      .setURL("https://fsh-bot.frostzzone.repl.co/invite")
      .setStyle(Discord.ButtonStyle.Link);
    const server = new Discord.ButtonBuilder()
      .setLabel("Server")
      .setURL("https://discord.gg/SXcXZN4tkM")
      .setStyle(Discord.ButtonStyle.Link);
    const button_row = new Discord.ActionRowBuilder().addComponents(
      website,
      invite,
      server
    );
    /* -- Context menu -- */
    let menu = new Discord.ActionRowBuilder().addComponents(
      new Discord.StringSelectMenuBuilder()
        .setCustomId(`help%${message.author.id}%`)
        .setPlaceholder("Select Category")
        .addOptions(
          {
            label: "Search commands",
            description: "Search commands",
            value: "search",
            emoji: `${fsh.emojis.search}`,
          },
          {
            label: "Main",
            description: "Main commands",
            value: "main",
            emoji: `${fsh.emojis.main}`,
          },
          {
            label: "Economy",
            description: "Economy commands",
            value: "economy",
            emoji: `${fsh.emojis.economy}`,
          },
          {
            label: "Fun",
            description: "Fun commands",
            value: "fun",
            emoji: `${fsh.emojis.fun}`,
          },
          {
            label: "Music",
            description: "Music commands",
            value: "music",
            emoji: `${fsh.emojis.music}`,
          },
          {
            label: "Utility",
            description: "Utility commands",
            value: "utility",
            emoji: `${fsh.emojis.utility}`,
          },
          {
            label: "Admin only",
            description: "Admin only commands",
            value: "admin",
            emoji: `${fsh.emojis.admin}`,
          },
          {
            label: "Context menus",
            description: "Context menus",
            value: "context",
            emoji: `${fsh.emojis.context}`,
          }
        )
    );
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.main} Bot help`)
      .setDescription(
        `Made by frostzzone#4486 and inventionpro#6814
(optional) - <obligatory> - {type}`
      )
      .setTimestamp()
      .setFooter({ text: "V" + fsh.version })
      .setColor(colourRandom());
    message.channel.send({
      embeds: [embed],
      components: [menu, button_row],
    });
  },
};
