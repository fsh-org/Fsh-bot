const Discord = require("discord.js");

/* -- Make Title Case -- */
function textToTitleCase(str) {
  return str.replace(/\S+/g, function (txt) {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase();
  });
}

function listsRepeat(value, n) {
  var array = [];
  for (var i = 0; i < n; i++) {
    array[i] = value;
  }
  return array;
}

let existing_cat = ["main", "economy", "fun", "music", "utility", "admin"];

module.exports = {
  name: "search-modal",
  async execute(client, interaction, userId, fsh) {
    /* -- Get search term -- */
    let term = interaction.fields.getTextInputValue("searchterm");

    const prefix = 'fsh!'
    let locale = fsh.getLocale(interaction);

    let results = [];
    let results2 = [];
    let done = [];

    /* -- Get results for said term -- */
    client.textcommands.forEach(command => {
      let commandName = command.name;
      if (Array.isArray(commandName)) {
        if (done.includes(commandName[0])) {
          return;
        } else {
          done.push(commandName[0])
        }
      }
      let commandInfo = command.info;
      let commandCat = command.category; // cat 🐈 reel

      if (command.slash) {
        let inf = locale.get(`commands.${commandName}`);
        commandName = inf.name;
        commandInfo = inf.info;
      }

      if (existing_cat.includes(commandCat)) {
        /* -- Get parameters --  */
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
        /* -- Join command name if multi alias -- */
        if (Array.isArray(commandName)) {
          commandName = commandName.join("/");
        }

        if (commandName.includes(term)) {
          results.push(`*${commandCat}* > **${command.slash ? '/' : prefix}${commandName}** ${param} - ${commandInfo}`);
        }
        if (commandInfo.includes(term)) {
          results2.push(`*${commandCat}* > **${command.slash ? '/' : prefix}${commandName}** ${param} - ${commandInfo}`);
        }
      }
    });
    /* -- create embed -- */
    let color = interaction.message.embeds[0].color;

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.search} Help Menu - Results For "${term}"`)
      .setDescription(`(optional) - <required>
Name search
> ${results.slice(0,18).join("\n> ") || "**Sorry, no commands have that name**"}
Info Search
> ${results2.slice(0,18).join("\n> ") || "**Sorry, no commands with that in their info**"}`.slice(0,4096))
      .setColor(color);

    await interaction.update({
      embeds: [embed]
    });
  }
};