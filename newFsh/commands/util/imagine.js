const Discord = require('discord.js');

module.exports = {
  name: 'imagine',
  params: ['prompt', true],
  info: 'Uses AI to generate a image based on your prompt',
  category: 'utility',

  async execute(message, arguments2, fsh) {
    const sep = '&';
    if (arguments2.length < 1) {
      message.channel.send('Put a prompt');
      return;
    }
    let negat = String(arguments2.join(' ').split(sep)[1]).replaceAll('\n',' ');
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.ai} Imagine`)
      .setDescription(`Prompt: ${String(arguments2.join(' ').split(sep)[0]).replaceAll('\n',' ')}
Negative: ${(negat == 'undefined') ? 'blur watermark' : negat}
Model: stabilityai/stable-diffusion-xl-base-1.0`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: 'png' })
      })
      .setColor('#888888');

    let meun = new Discord.StringSelectMenuBuilder()
      .setCustomId(`imagine-menu%${message.author.id}%`)
      .setPlaceholder('Select Model')
      .addOptions(
        {
          label: 'Stable Diffusion XL',
          description: 'stabilityai/stable-diffusion-xl-base-1.0',
          value: 'stabilityai/stable-diffusion-xl-base-1.0',
          default: true,
        },
        {
          label: 'Stable Diffusion 3',
          description: 'stabilityai/stable-diffusion-3-medium-diffusers',
          value: 'stabilityai/stable-diffusion-3-medium-diffusers',
        },
        {
          label: 'FLUX 1 Dev',
          description: 'black-forest-labs/FLUX.1-dev',
          value: 'black-forest-labs/FLUX.1-dev',
        },
        {
          label: 'FLUX 1 Schnell',
          description: 'black-forest-labs/FLUX.1-schnell',
          value: 'black-forest-labs/FLUX.1-schnell',
        }
      );
    let menu = new Discord.ActionRowBuilder().addComponents(meun);
    let button_row = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
      .setLabel('Generate')
      .setCustomId(`imagine-button%${message.author.id}%`)
      .setStyle(Discord.ButtonStyle.Success)
    );

    message.channel.send({
      embeds: [embed],
      components: [menu, button_row]
    });
  }
};