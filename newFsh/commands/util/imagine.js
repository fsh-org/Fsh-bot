const Discord = require("discord.js");

module.exports = {
  name: "imagine",
  params: ['prompt', true],
  info: "Uses AI to generate a image based on your prompt",
  category: "utility",

  async execute(message, arguments2, fsh) {
    const sep = "&";
    if (arguments2.length < 1) {
      message.channel.send("Put a prompt")
      return;
    }
    let negat = String(arguments2.join(" ").split(sep)[1]).replaceAll("\n"," ")
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.ai} Imagine`)
      .setDescription(`Prompt: ${String(arguments2.join(" ").split(sep)[0]).replaceAll("\n"," ")}
Negative: ${(negat == "undefined") ? "blur watermark" : negat}
Model: SG161222/Realistic_Vision_V1.4`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: "png" })
      })
      .setColor("#888888");

    let meun = new Discord.StringSelectMenuBuilder()
      .setCustomId(`imagine-menu%${message.author.id}%`)
      .setPlaceholder("Select Model")
      .addOptions(
        {
          label: "Realistic vision 1.4",
          description: "SG161222/Realistic_Vision_V1.4",
          value: "SG161222/Realistic_Vision_V1.4",
          default: true,
        },
        {
          label: "Protogen 5.8",
          description: "darkstorm2150/Protogen_x5.8_Official_Release",
          value: "darkstorm2150/Protogen_x5.8_Official_Release",
        },
        {
          label: "Pixel art XL",
          description: "nerijs/pixel-art-xl",
          value: "nerijs/pixel-art-xl",
        },
        {
          label: "Voxel 2",
          description: "plasmo/vox2",
          value: "plasmo/vox2",
        },
        {
          label: "Redshift diffusion",
          description: "nitrosocke/redshift-diffusion",
          value: "nitrosocke/redshift-diffusion",
        },
        {
          label: "OpenJourney",
          description: "prompthero/openjourney",
          value: "prompthero/openjourney",
        },
        {
          label: "Dream shaper",
          description: "Lykon/DreamShaper",
          value: "Lykon/DreamShaper",
        },
        {
          label: "Stable diffusion 2.1",
          description: "stabilityai/stable-diffusion-2-1",
          value: "stabilityai/stable-diffusion-2-1",
        },
        {
          label: "Ghibli Diffusion",
          description: "nitrosocke/Ghibli-Diffusion",
          value: "nitrosocke/Ghibli-Diffusion",
        },
        {
          label: "Photosphere",
          description: "Yntec/Photosphere",
          value: "Yntec/Photosphere",
        },
        {
          label: "Furry mix (ddede)",
          description: "stablediffusionapi/bb95-furry-mix",
          value: "stablediffusionapi/bb95-furry-mix",
        } //furby, xd
      );
    /*t = ["767102460673916958","439788095483936768"]
    if (fsh.devIds.includes(message.member.id) || t.includes(message.member.id)) {
      meun.addOptions(
        {
          label: "Rainbow Dreams (nsfw)",
          description: "Yntec/RainbowDreams",
          value: "Yntec/RainbowDreams",
        },
        {
          label: "Photoreal 2.0 (may be nsfw)",
          description: "dreamlike-art/dreamlike-photoreal-2.0",
          value: "dreamlike-art/dreamlike-photoreal-2.0",
        },
        {
          label: "Waifu difussion (why)",
          description: "hakurei/waifu-diffusion",
          value: "hakurei/waifu-diffusion",
        },
        {
          label: "just nsfw (u horny)",
          description: "Yntec/sexyToons",
          value: "Yntec/sexyToons"
        }
      )
    }*/
    let menu = new Discord.ActionRowBuilder().addComponents(meun);
    let button_row = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
      .setLabel("Generate")
      .setCustomId(`imagine-button%${message.author.id}%`)
      .setStyle(Discord.ButtonStyle.Success)
    );

    message.channel.send({
      embeds: [embed],
      components: [menu, button_row]
    })
  }
};
