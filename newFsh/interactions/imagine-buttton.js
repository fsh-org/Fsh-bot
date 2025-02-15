const Discord = require("discord.js");
const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  name: "imagine-button-button",
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

    let temptime = Math.floor(new Date()/1000)

    let embed = interaction.message.embeds[0]
    let newEmbed = Discord.EmbedBuilder.from(embed)
    let tempEmbed = Discord.EmbedBuilder.from(embed)
    let params = encodeURIComponent(embed.description.replace("Prompt: ","").replace("Negative: ","").replace("Model: ","")).split("%0A")
    tempEmbed.setDescription(embed.description+`\n\n${fsh.emojis.load} Generating your image, please wait\nStarted: <t:${temptime}:R>`)

    await interaction.update({
      embeds: [tempEmbed], //set embed
      components: [] //delete rows
    });

    temptime = Math.floor(new Date()/1000)
    let image;
    try {
      image = await fetch(`https://api.fsh.plus/imagine?text=${params[0]}&negative=${params[1]}&model=${params[2]}`)
      image = await image.json()
      if (image.err) throw new Error("failed generate");
      if (!image.link) throw new Error("failed generate");
      image = image.link
    } catch (err) {
      await interaction.editReply({
        content: 'could not generate',
        embeds: [], //delete embed
        components: [] //delete rows
      });
      return;
    }

    newEmbed.setDescription(embed.description+`\n\nTime taken: \`${Math.floor(new Date()/1000)-temptime} seconds\``)
    newEmbed.setImage(image)

    await interaction.editReply({
      embeds: [newEmbed]
    });
  }
};