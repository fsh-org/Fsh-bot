const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  execute(fsh, interaction) {
    //console.log(interaction)
    /* -- Is slash command -- */
    if (interaction.isChatInputCommand()) {
      // Do stuff
      return;
    }
    /* -- Is menu -- */
    if (interaction.isStringSelectMenu()) {
      let interId = interaction.customId;
      let userId = 0;

      if (/\%(.*?)\%/g.test(interId)) {
        userId = interId.match(/\%(.*?)\%/g)[0].replace(/%/g, "") || 0;
        interId = interId.replace(/\%(.*?)\%/g, "");
      }
      if (!fsh.client.interactions.has(`${interId}-menu`)) return;
      fsh.client.interactions
        .get(`${interId}-menu`)
        .execute(fsh.client, interaction, userId, fsh);
      return;
    }
    /* -- Is button -- */
    if (interaction.isButton()) {
      // Do stuff
      return;
    }
    /* -- Is context menus -- */
    if (interaction.isUserContextMenuCommand()) {
      if (!fsh.client.contextmenu.has(`${interaction.customId}`)) return;
      fsh.client.contextmenu
        .get(`${interaction.customId}`)
        .execute(fsh.client, interaction, userId, fsh);
      return;
    }
    /* -- Is modal/form -- */
    if (interaction.isModalSubmit()) {
      let interId = interaction.customId;
      if (!fsh.client.interactions.has(`${interId}-modal`)) return;
      fsh.client.interactions
        .get(`${interId}-modal`)
        .execute(fsh.client, interaction, 0, fsh);
      return;
    }
  },
};
