const Discord = require('discord.js');

module.exports = {
  name: 'help',
  info: 'List of all commands',
  category: 'main',

  async execute(interaction, _, fsh) {
    let userin = (id)=>interaction.guild.members.cache.has(id)?`<@${id}>`:(fsh.client.users.cache.has(id)?fsh.client.users.cache.get(id).username:'unknown');
    /* -- Buttons -- */
    const website = new Discord.ButtonBuilder()
      .setLabel('Website')
      .setURL('https://fsh.plus')
      .setEmoji(fsh.emojis.website)
      .setStyle(Discord.ButtonStyle.Link);
    const invite = new Discord.ButtonBuilder()
      .setLabel('Invite')
      .setURL('https://bot.fsh.plus/invite')
      .setEmoji(fsh.emojis.link)
      .setStyle(Discord.ButtonStyle.Link);
    const server = new Discord.ButtonBuilder()
      .setLabel('Server')
      .setURL('https://discord.gg/SXcXZN4tkM')
      .setEmoji(fsh.emojis.discord)
      .setStyle(Discord.ButtonStyle.Link);
    const button_row = new Discord.ActionRowBuilder().addComponents(website, invite, server);
    /* -- Context menu -- */
    let menu = new Discord.ActionRowBuilder().addComponents(
      new Discord.StringSelectMenuBuilder()
        .setCustomId(`help%${interaction.author.id}%`)
        .setPlaceholder('Select a category')
        .addOptions(
          {
            label: 'Search commands',
            description: 'Search for a command',
            value: 'search',
            emoji: `${fsh.emojis.search}`,
          },
          {
            label: 'Main',
            description: 'Main commands of fsh',
            value: 'main',
            emoji: `${fsh.emojis.main}`,
          },
          {
            label: 'Fun',
            description: 'Fun and random commands',
            value: 'fun',
            emoji: `${fsh.emojis.fun}`,
          },
          {
            label: 'Utility',
            description: 'Useful commands',
            value: 'utility',
            emoji: `${fsh.emojis.utility}`,
          },
          {
            label: 'Economy',
            description: 'Commands for Fsh economy',
            value: 'economy',
            emoji: `${fsh.emojis.economy}`,
          },
          {
            label: 'Music',
            description: 'VC music controls',
            value: 'music',
            emoji: `${fsh.emojis.music}`,
          },
          {
            label: 'Moderation',
            description: 'Admin only commands',
            value: 'admin',
            emoji: `${fsh.emojis.admin}`,
          },
          {
            label: 'Context menus',
            description: 'Context menu commands (right-click)',
            value: 'context',
            emoji: `${fsh.emojis.context}`,
          }
        )
    );
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.main} Bot help`)
      .setDescription(`Search between commands, select a category.
Made by ${userin('712342308565024818')} & ${userin('816691475844694047')}`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor('#'+Math.floor(Math.random()*0xFFFFFF).toString(16));
    interaction.channel.send({
      embeds: [embed],
      components: [menu, button_row]
    });
  }
};
