const Discord = require("discord.js");
const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  name: "imagine-menu-menu",
  async execute(client, interaction, userId, fsh) {
    if (
      interaction.user.id != userId &&
      !fsh.devIds.includes(interaction.user.id)
    ) {
      return await interaction.reply({
        content: "This isnt your menu",
        ephemeral: true,
      });
    }
    const selected = interaction.values[0];
    let op = interaction.message.components[0].components[0].data.options
    let opt = []
    op.forEach(ele => {
      let c = ele
      if (ele.value == selected) {
        c.default = true
      } else {
        c.default = false
      }
      opt.push(c)
    })
    let menu = new Discord.ActionRowBuilder().addComponents(
      new Discord.StringSelectMenuBuilder()
        .setCustomId(`imagine-menu%${interaction.user.id}%`)
        .setPlaceholder("Select Model")
        .setOptions(opt)
    );
    let button_row = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
      .setLabel("Generate")
      .setCustomId(interaction.message.components[1].components[0].data.custom_id)
      .setStyle(Discord.ButtonStyle.Success)
    );
    
    // it work!!    
    let embed = interaction.message.embeds[0]
    let newEmbed = Discord.EmbedBuilder.from(embed)
    newEmbed.setDescription(embed.description.replace(/Model.+/g, `Model: ${selected}`))
    await interaction.update({
      embeds: [newEmbed],
      components: [menu, button_row]
    });
  },
};
