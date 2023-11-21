/* -- If section is comented it's optional -- */
/* --- Also rename file from .ts to .js --- */
/* --- Its .ts bc file handeler reads only .js --- */
const Discord = require("discord.js");

module.exports = {
  /* Name of command: fsh!command_name */
  name: "command_name", /* if multiple: ['name1', 'name2'] */

  /* [param1, required1, param2, required2] */
  //params: ['param1', false],

  /* Shown on help menu */
  info: "Info on command",

  /* main, economy, fun, music, utility, admin: anything else will hide it */
  category: "hidden",

  /* function that runs when command is recived */
  async execute(message, arguments2, fsh) {
    /*
        message - message object {content, channel, author, ect...}
        arguments2 - command arguments [arg1, arg2, ect...]
        fsh - object {client, database, version, devIds}
    */
    // Do stuff here
  }
};
