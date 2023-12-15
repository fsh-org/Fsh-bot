/* This is a easter egg
don't ruin the fun by looking at what it does in code
just use the file name as a hint
*/

const Discord = require("discord.js");

module.exports = {
  name: "omegle",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    let embed = new Discord.EmbedBuilder()
      .setTitle(`Omegle`)
      .setURL("https://www.omegle.com/")
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setThumbnail('https://www.omegle.com/static/gravestone.png')
      .setColor("#888888")
      .setDescription(`Bye omegle
You helped many people, but all good things can be used for bad
On the ongoing war to kill comunication you weren't able to continue
More info:
- [Author's complete response](https://www.omegle.com/)
- [Lawsuit of breaking point](https://www.omegle.com/lawsuit)`);

    message.reply({
      embeds: [embed]
    })
  }
};
