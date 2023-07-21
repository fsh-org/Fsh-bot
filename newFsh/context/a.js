/* -- If section is comented it's optional -- */
/* --- Also rename file from .ts to .js --- */
/* --- Its .ts bc file handeler reads only .js --- */

module.exports = {
  /* Name of context_name */
  name: "context_name",

  /* Where context menu is used (user, message) */
  usage: "user",

  /* Shown on help menu */
  info: "Info on menu",

  /* function that runs when command is recived */
  async execute(fsh, interaction) {
    /*
        fsh - object {client, database, version}
        interaction - object {name, ect.}
    */
    // Do stuff here
  },
};
