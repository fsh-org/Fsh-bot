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

    let results = [];
    let results2 = [];

    /* -- Get results for said term -- */
    client.textcommands.forEach((command) => {
      let commandName = command.name;
      let commandInfo = command.info;
      let commandCat = command.category; // cat 🐈 reel
      let commandCatn =
        commandCat + listsRepeat(" ", 8 - commandCat.length).join("");

      if (existing_cat.includes(commandCat)) {
        /* -- Get parameters --  */
        let paramList = [];
        var i_inc = 2;
        let param = command.params || [];
        if (param.length != 0) {
          for (i = 0; i <= param.length / 2; i += i_inc) {
            if (param[i + 1] == true) {
              paramList.push(`<${param[i]}>`);
            } else {
              paramList.push(`(${param[i]})`);
            }
          }
        }
        param = paramList.join(" ");
        /* -- Join command name if multi alias -- */
        if (Array.isArray(commandName)) {
          commandName = commandName.join("/");
        }

        if (commandName.includes(term)) {
          results.push(
            `${commandCatn} > fsh!${commandName} ${param} - ${commandInfo}`
          );
        }
        if (commandInfo.includes(term)) {
          results2.push(
            `${commandCatn} > fsh!${commandName} ${param} - ${commandInfo}`
          );
        }
      }
    });
    /* -- create embed -- */
    let color = interaction.message.embeds[0].color;

    // o i forgor to make param getter
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.search} Help Menu - Results For (${term})`)
      .setDescription(
        `<required>, (not required)
      Name search
	 > ${results.join("\n> ") || "**Sorry, no commands that have that name**"}
      Info Search
   > ${results2.join("\n> ") || "**Sorry, no commands with that in the info**"}`
      )
      .setColor(color);

    /* -- join/send results -- */
    await interaction.update({
      embeds: [embed],
    });
  },
};
