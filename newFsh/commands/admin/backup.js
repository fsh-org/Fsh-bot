const Discord = require("discord.js");
const { PermissionsBitField } = require("discord.js");
const write = require("write");
const fs = require("fs");

module.exports = {
  name: "backup",
  params: ["param1", false],
  info: "Load/Save a copy of your server",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    // temp dev only //
    if (!fsh.devIds.includes(message.author.id)) {
      message.channel.send(
        "Backsups are currently dev only as they may break your server"
      );
      return;
    }
    // ------------- //

    // this basiclly abandoned
		// e
    if (
      !message.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      ) &&
      !fsh.devIds.includes(message.author.id)
    ) {
      message.channel.send("You don't have administrator permissions");
      return;
    }
    let con;

    let channels = [];
    message.guild.channels.cache.forEach(async (c) => {
      if (c.nsfw == "") {
        let h = String(c.topic).replaceAll("\n", "\\n");
        channels.push(`{
      "name": "${c.name.replaceAll('"', '\\"')}",
      "id": "${c.id}",
      "position": "${c.rawPosition}",
      "parent": "${c.parent}",
      "topic": "${h}",
      "nsfw": "${c.nsfw}",
      "type": "${c.type}"
    }`);
      } else {
        channels.push(`{
      "name": "${c.name.replaceAll('"', '\\"')}",
      "id": "${c.id}",
      "position": "${c.rawPosition}",
      "parent": "${c.parent}",
      "type": "${c.type}"
    }`);
      }
    });

    let roles = [];
    message.guild.roles.cache.forEach(async (r) => {
      roles.push(`{
      "name": "${r.name}"
      "id": "${r.id}"
      "icon": "${r.icon}"
      "color": "${r.color}"
      "hoist": "${r.hoist}"
      "position": "${r.rawPosition}"
      "managed": "${r.managed}"
      "mentionable": "${r.mentionable}"
    }`);
    });

    con = `{
  "Channels": [
    ${channels.join(",\n    ")}
  ],
  "Roles": [
    ${roles.join(",\n    ")}
  ]
}`;
    write.sync(`text/backups/${message.guild.id}.json`, con, {
      overwrite: true,
    });
  },
};
