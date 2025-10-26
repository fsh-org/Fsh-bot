const Discord = require("discord.js");
const fs = require("fs");

function createBackup(message) {
  const g = message.guild;
  let backup = {
    server: {},
    channels: [],
    roles: []
  };

  /* Needs saving
  server icon
  bans
  automod
  splash
  banner
  discovery splash
  afk
  widget
  rules
  public updates
  safety alerts channel
  emojis
  stickers
  */

  backup.server = {
    name: g.name,
    description: g.description,
    //icon: '993235a2a20911cd34821c47ce38077f',
    //bans: GuildBanManager { guild: [Circular *1] },
    //autoModerationRules: AutoModerationRuleManager { guild: [Circular *1] },
    //splash: null,
    //banner: null,
    verificationLevel: g.verificationLevel,
    //discoverySplash: null,
    premiumProgressBarEnabled: g.premiumProgressBarEnabled,
    afkTimeout: g.afkTimeout,
    /*afkChannelId: null,
    systemChannelId: '1134230605069045901',
    widgetEnabled: null,
    widgetChannelId: null,*/
    explicitContentFilter: g.explicitContentFilter,
    mfaLevel: g.mfaLevel,
    defaultMessageNotifications: g.defaultMessageNotifications,
    //rulesChannelId: '1134235498739671040',
    //publicUpdatesChannelId: '1134235498739671041',
    preferredLocale: g.preferredLocale
    //safetyAlertsChannelId: null,
    //emojis: GuildEmojiManager { guild: [Circular *1] },
    //stickers: GuildStickerManager { guild: [Circular *1] }
  }

  let channels = [];
  g.channels.cache.forEach(async (c) => {
    /* need saveing
    permisions
    last messages?
    */
    let ch = {
      type: c.type,
      name: c.name,
      position: c.rawPosition
    };

    if (c.type!==4) {
      ch.parent = c.parent
      ch.topic = c.topic
      ch.nsfw = c.nsfw
    }

    if ([2, 13].includes(ch.type)) {
      ch.bitrate = c.bitrate
      ch.userLimit = c.userLimit
    }

    channels.push(ch)
    /*
      permissionOverwrites: PermissionOverwriteManager { channel: [Circular *2] },
      messages: GuildMessageManager { channel: [Circular *2] }
    */
  })
  backup.channels = channels;

  let roles = [];
  g.roles.cache.forEach(async (r) => {
    /* needs savinger
    icon
    permision
    */
    roles.push({
      name: r.name,
      //icon: null,
      unicodeEmoji: r.unicodeEmoji,
      colors: r.colors,
      hoist: r.hoist,
      rawPosition: r.rawPosition,
      //permissions: PermissionsBitField { bitfield: 1096185279794753n },
      managed: r.managed,
      mentionable: r.mentionable,
      tags: r.tags // this saves things like bot author
    });
  });
  backup.roles = roles;

  fs.writeFileSync(`text/backups/${g.id}.json`, JSON.stringify(backup, null, 2));
  message.reply(`created`)
}
function loadBackup(message, id, fsh) {
  const g = fsh.client.guilds.cache.get(id);
  if (!g) {
    message.reply('fsh is not in this server, if it has been deleted contact us');
    return;
  }
  let backup = JSON.parse(fs.readFileSync(`text/backups/${g.id}.json`, 'utf8'));

  backup.server = {
    name: g.name,
    description: g.description,
    verificationLevel: g.verificationLevel,
    premiumProgressBarEnabled: g.premiumProgressBarEnabled,
    afkTimeout: g.afkTimeout,
    explicitContentFilter: g.explicitContentFilter,
    mfaLevel: g.mfaLevel,
    defaultMessageNotifications: g.defaultMessageNotifications,
    preferredLocale: g.preferredLocale
  }

  let channels = [];
  g.channels.cache.forEach(async (c) => {
    let ch = {
      type: c.type,
      name: c.name,
      position: c.rawPosition
    };

    if (c.type!==4) {
      ch.parent = c.parent
      ch.topic = c.topic
      ch.nsfw = c.nsfw
    }

    if ([2, 13].includes(ch.type)) {
      ch.bitrate = c.bitrate
      ch.userLimit = c.userLimit
    }

    channels.push(ch)
  })
  backup.channels = channels;

  let roles = [];
  g.roles.cache.forEach(async (r) => {
    roles.push({
      name: r.name,
      unicodeEmoji: r.unicodeEmoji,
      colors: r.colors,
      hoist: r.hoist,
      rawPosition: r.rawPosition,
      managed: r.managed,
      mentionable: r.mentionable,
      tags: r.tags // this saves things like bot author
    });
  });
  backup.roles = roles;
}

module.exports = {
  name: "backup",
  params: ["action", true],
  info: "Load/Save a copy of your server",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    // temp dev only //
    if (!fsh.devIds.includes(message.author.id)) {
      message.channel.send("Backsups are currently dev only as they may break your server");
      return;
    }
    // ------------- //

    if (!arguments2[0]) {
      message.reply(`what do you want to do?
- create - creates a backup of the server (channels, roles, basic settings)
- load - loads a backup of the server (dangerous!!!)
- loadother - loads another server (dangerous!!!, you need to be an admin on that server)`);
      return;
    }

    switch (arguments2[0]) {
      case 'create':
        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) && !fsh.devIds.includes(message.author.id)) {
          message.channel.send("you don't have administrator permissions");
          return;
        }
        createBackup(message)
        break;
      case 'load':
        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) && !fsh.devIds.includes(message.author.id)) {
          message.channel.send("you don't have administrator permissions");
          return;
        }
        loadBackup(message, message.guild.id, fsh)
        break;
      case 'loadother':
        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) && !fsh.devIds.includes(message.author.id)) {
          message.channel.send("you don't have administrator permissions");
          return;
        }
        loadBackup(message, arguments2[1], fsh)
        break;
      default:
        message.reply('unknown action')
        break;
    }
  }
};