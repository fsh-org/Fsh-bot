const Discord = require("discord.js");
const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

/* -- Make Title Case -- */
function textToTitleCase(str) {
  return str.replace(/\S+/g, function (txt) {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase();
  });
}

// list listed double commands so then we dont accidentaly list 2
let doblcomd = [];

/* -- Manage creating the help embed -- */
function helpGen(collection, category, prefix, interaction, context, fsh) {
  let locale = fsh.getLocale(interaction);
  let color = interaction.message.embeds[0].color;
  let help = [];
  if (category === "context") {
    context.forEach((menu) => {
      help.push(`**${menu.name}** {${menu.usage}} - ${menu.info}`);
    });
  } else {
    doblcomd = [];
    collection.forEach((command) => {
      let commandName = command.name;
      if (Array.isArray(commandName)) {
        if (!doblcomd.includes(commandName.join("/"))) {
          doblcomd.push(commandName.join("/"));
          commandName = commandName.join("/");
        } else {
          return;
        }
      }
      if (command.category === category) {
        let param = command.params || [];
        if (command.slash) {
          param = param.map(p => `${p.required ? '<' : '('}${locale.get('commands.'+command.name+'.params.'+p.name+'.name')}${p.required ? '>' : ')'}`).join(' ');
        } else {
          let paramList = [];
          if (param.length != 0) {
            for (i = 0; i <= param.length / 2; i += 2) {
              if (param[i + 1] == true) {
                paramList.push(`<${param[i]}>`);
              } else {
                paramList.push(`(${param[i]})`);
              }
            }
          }
          param = paramList.join(" ");
        }
        help.push(`**${command.slash ? '/' : prefix}${commandName}** ${param} - ${command.slash ? locale.get(`commands.${command.name}.info`) : command.info}`);
      }
    });
  }
  help = help.sort();
  let desc;
  let titl;
  interaction.message.components[0].components[0].data.options.forEach(
    (element) => {
      if (element.value == interaction.values[0]) {
        titl = element.label;
        desc = element.description;
      }
    }
  );
  let embed = new Discord.EmbedBuilder()
    .setTitle(`${fsh.emojis[category]} Help Menu - ${textToTitleCase(titl)}`)
    .setDescription(
      `${desc}${category == "context" ? "" : "\n(optional) - <required>"}
>>> ${help.join("\n") || "**Sorry, no commands for this category yet**"}`
    )
    .setColor(color);

  return embed;
}

module.exports = {
  name: "help-menu",
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

    if (selected == "search") {
      const modal = new ModalBuilder().setCustomId("search").setTitle("Search");

      // Create the text input components
      const searchterm = new TextInputBuilder()
        .setCustomId("searchterm")
        .setLabel("What term do you want to search for?")
        .setStyle(TextInputStyle.Short);

      const firstActionRow = new ActionRowBuilder().addComponents(searchterm);

      modal.addComponents(firstActionRow);
      await interaction.showModal(modal);
      return;
    }

    let embed = helpGen(
      client.textcommands,
      selected,
      "fsh!",
      interaction,
      client.contextmenu,
      fsh
    );
    await interaction.update({
      embeds: [embed]
    });
  }
};