const Discord = require("discord.js");
const fs = require("fs");

function UserCheck(mem, members, susers) {
  let now = (Math.floor(new Date().getTime() / 1000));
  // get names
  let un = String(susers[mem].user.username).toLowerCase();
  let nn = String(susers[mem].nickname).toLowerCase();
  let dn = String(susers[mem].user.globalName).toLowerCase();
  // If scemer or bad add 20 sus
  if (fs.readFileSync('text/bad.txt', 'utf8').split(",").includes(susers[mem].id)) {
    members[mem] = 20 + members[mem]
  }
  // If vewy bad (server nuker, groomer, ect) add 1k sus uwu (idk what im doing with my life)
  if (fs.readFileSync('text/vewybad.txt', 'utf8').split(",").includes((susers[mem].id))) {
    members[mem] = 1000 + members[mem]
  }
  // is spammer add 8 sus
  if (susers[mem].flags.has(1048576)) {
    members[mem] = 8 + members[mem]
  }
  // Define when user account created
  let cret = (Math.floor(new Date(susers[mem].user.createdAt) / 1000));
  // If created in less than 4 moths add 3 sus
  if (cret > (now - 10368000)) {
    members[mem] = 3 + members[mem]
  }
  // If created in less than 14 days add 2 sus
  if (cret > (now - 1209600)) {
    members[mem] = 2 + members[mem]
  }
  // If no pfp +1 sus
  if (String(susers[mem].displayAvatarURL()).includes("embed/")) {
    members[mem] = 1 + members[mem]
  }
  // If not verified bot and has admon add +1
  if (susers[mem].user.bot) {
    if (!susers[mem].user.flags.has(Discord.UserFlags.VerifiedBot)) {
      if (susers[mem].permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
        members[mem] = 1 + members[mem]
      }
    }
  }
  // if discrim
  if (String(susers[mem].user.discriminator) != "0" && !susers[mem].user.bot) {
    members[mem] = 2 + members[mem]
  }
  if ((un.match(/[^0-9][0-9]{4}$/m)||[''])[0].length) {
    members[mem] = 4 + members[mem]
  }
  if ((un.match(/_[0-9]{5}$/m)||[''])[0].length) {
    members[mem] = 2 + members[mem]
  }
  // if "giveaway", "nitro", "free", "bio" (not bot) or "discord", "steam","google" (yes bot) in name +3 sus each
  if (!susers[mem].user.bot) {
    if (un.includes("giveaway") || dn.includes("giveaway") || nn.includes("giveaway")) {
      members[mem] = 3 + members[mem]
    }
    if (un.includes("nitro") || dn.includes("nitro") || nn.includes("nitro")) {
      members[mem] = 3 + members[mem]
    }
    if (un.includes("free") || dn.includes("free") || nn.includes("nitro")) {
      members[mem] = 3 + members[mem]
    }
    if (un.includes("bio") || dn.includes("bio") || nn.includes("bio")) {
      members[mem] = 3 + members[mem]
    }
  }
  if (un.includes("discord") || dn.includes("discord") || nn.includes("discord")) {
    members[mem] = 3 + members[mem]
    // +1 sus if bot
    if (susers[mem].user.bot) {
      members[mem] = 1 + members[mem]
    }
  }
  if (un.includes("steam") || dn.includes("steam") || nn.includes("steam")) {
    members[mem] = 3 + members[mem]
    // +1 sus if bot
    if (susers[mem].user.bot) {
      members[mem] = 1 + members[mem]
    }
  }
  if (un.includes("google") || dn.includes("google") || nn.includes("google")) {
    members[mem] = 3 + members[mem]
    // +1 sus if bot
    if (susers[mem].user.bot) {
      members[mem] = 1 + members[mem]
    }
  }
  // if name contains zoophile symbol +2 sus (this may give false positives)
  if (un.includes("ζ") || dn.includes("ζ") || nn.includes("ζ")) {
    members[mem] = 2 + members[mem]
  }
  // if name contains groomer symbol +2 sus (its also the micro simbols so many false positives)
  if (un.includes("μ") || dn.includes("μ") || nn.includes("μ")) {
    members[mem] = 2 + members[mem]
  }
  // If not a bot and impersonates bot +5
  if (!susers[mem].user.bot) {
    let bots = ["captcha.bot","mee6","fsh","probot","dyno","carl-bot","arcane","dank memer"];
    bots.forEach(e => {
      if (un.includes(e) || dn.includes(e)) {
        members[mem] = 5 + members[mem]
      }
    })
  }
  // if n word +8
  if (un.includes("nigg") || dn.includes("nigg") || nn.includes("nigg")) {
    members[mem] = 8 + members[mem]
  }
  // if name_num_num (spam) account +8
  if (un.match(/[a-zA-Z]{2,10}_[0-9]{4,}_[0-9]{4,}/g) || dn.match(/[a-zA-Z]{2,10}_[0-9]{4,}_[0-9]{4,}/g) || nn.match(/[a-zA-Z]{2,10}_[0-9]{4,}_[0-9]{4,}/g)) {
    members[mem] = 8 + members[mem]
  }
  // Scam account +8
  if (un.includes("𝐋𝐈𝐍𝐊 𝐈𝐍 𝐁𝐈𝟎") || dn.includes("𝐋𝐈𝐍𝐊 𝐈𝐍 𝐁𝐈𝟎") || nn.includes("𝐋𝐈𝐍𝐊 𝐈𝐍 𝐁𝐈𝟎")) {
    members[mem] = 8 + members[mem]
  }
  if (un.includes("𝐀𝐈𝐑𝐃𝐑𝐎𝐏 𝐋𝐈𝐕𝐄") || dn.includes("𝐀𝐈𝐑𝐃𝐑𝐎𝐏 𝐋𝐈𝐕𝐄") || nn.includes("𝐀𝐈𝐑𝐃𝐑𝐎𝐏 𝐋𝐈𝐕𝐄")) {
    members[mem] = 8 + members[mem]
  }
  // if name contains link for possible ad +5
  let links = ["youtbe.com","youtu.be","twitch.tv","instagram.com","facebook.com","twitter.com","x.com","discord.gg"];
  links.forEach(e => {
    if (un.includes(e) || dn.includes(e) || nn.includes(e)) {
       members[mem] = 5 + members[mem]
    }
  })
  // If crypto/currency +2 each
  let cry = ["bitcoin"," eth","doge","monero","usd"];
  cry.forEach(e => {
    if (un.includes(e) || dn.includes(e) || nn.includes(e)) {
       members[mem] = 2 + members[mem]
    }
  })
  // Bit, dot combined with more +2
  let WB = ["bit","dot"]
  WB.forEach(e => {
    un.split(" ").forEach(ee => {
      if(ee.includes(e)) members[mem] = 2 + members[mem];
    })
    dn.split(" ").forEach(ee => {
      if(ee.includes(e)) members[mem] = 2 + members[mem];
    })
    nn.split(" ").forEach(ee => {
      if(ee.includes(e)) members[mem] = 2 + members[mem];
    })
  })
  // Nick / Global name to be placed on top (common scammer tactic) +4
  if (dn === "!" || nn === "!") {
    members[mem] = 4 + members[mem]
  }
  // Word DM in status +5
  let pres = susers[mem]?.presence;
  if (pres) {
    pres = pres?.activities;
    if (pres) {
      pres = pres.filter(e=>e.type===4);
      if (pres[0]) {
        pres = pres[0].state;
        if (pres) {
          pres = pres.toLowerCase();
          if (pres.includes('dm')) {
            members[mem] = 5 + members[mem]
          }
          // Remove some false positives
          if (pres.includes('word')) {
            members[mem] = members[mem] - 3
          }
          if (pres.includes('potato') || pres.includes('uwu')) {
            members[mem] = members[mem] - 2
          }
        }
      }
    }
  }
}

module.exports = {
  name: "scan",
  info: "Scans server to check problems",
  category: "admin",

  async execute(message, arguments2, fsh) {

    let members = {};
    let susers = {}

    message.guild.members.cache.forEach(async m => {
      if (!fsh.devIds.includes(m.id)) {
        members[m.id] = 0;
        susers[m.id] = m;
      }
    })

    for (var mem in members) {
      UserCheck(mem, members, susers)
    }

    let sortable = [];
    for (var t in members) {
      sortable.push([t, members[t]]);
    }
    sortable = sortable
      .sort((a, b) => a[1] - b[1])
      .reverse()
      .filter(e => e[1] != 0)
      .map(e => `${e[1]>8?"⚠️":""}${message.guild.members.cache.get(e[0]).displayName} (<@${e[0]}>) - ${e[1]}`);

    let a = ""
    var repeat_end = Math.min(Math.max(sortable.length, 0), 20);
    for (var count = 0; count < repeat_end; count++) {
      a = `${a}${count}. ${sortable[count]}\n`;
    }

    let DangerPerms = [2n,4n,16n,32n,8192n,131072n,524288n,268435456n,536870912n,1073741824n,1073741824n,8589934592n,17179869184n,1099511627776n,2199023255552n];

    let b = [];
    message.guild.roles.cache.forEach(async r => {
      let yu = [];
      DangerPerms.forEach(t => {
        if (r.permissions.has(t)) {
          for (var key in Discord.PermissionsBitField.Flags) {
            if (Discord.PermissionsBitField.Flags[key] == t) {
              yu.push(key);
              continue;
            }
          }
        }
      })
      if (yu.length > 0) {
        if (r.permissions.has(8n)) {
          b.unshift(`<@&${r.id}> - All`)
        } else {
          b.push(`<@&${r.id}> - ${yu.join(", ")}`)
        }
      }
    })

    let c = [];
    message.guild.members.cache.forEach(async r => {
      let yu = [];
      DangerPerms.forEach(t => {
        if (r.permissions.has(t)) {
          for (var key in Discord.PermissionsBitField.Flags) {
            if (Discord.PermissionsBitField.Flags[key] == t) {
              yu.push(key);
              continue;
            }
          }
        }
      })
      if (yu.length > 0) {
        if (r.permissions.has(8n)) {
          c.unshift(`<@${r.id}> - All`)
        } else {
          c.push(`<@${r.id}> - ${yu.join(", ")}`)
        }
      }
    })

    let news = {};
    message.guild.members.cache.forEach(async m => {
      news[m.user.id] = m.joinedAt;
    })
    let snew = [];
    for (var i in news) {
      snew.push([i, news[i]]);
    }
    snew.sort(function(a, b) {
      return a[1] - b[1];
    });
    snew = snew.reverse();

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.admin} Security scan`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setColor("#888888")
      .setDescription(`Fsh security scan ${fsh.emojis.admin}`)
      .addFields(
        {
          name: `Roles with dangerous permissions (${b.length})`,
          value: b ? `Rol | Permission\n${b.slice(0,18).join("\n").slice(0,950)}\n${b.slice(0,15).length != b.length ? `[${b.length-15} more]`:""}` : "No roles with dangerous permisions found",
          inline: true
        },
        {
          name: `Users with dangerous permissions (${c.length})`,
          value: c ? `User | Permission\n${c.slice(0,18).join("\n").slice(0,950)}\n${c.slice(0,20).length != c.length ? `[${c.length-20} more]`:""}` : "No users with dangerous permisions found",
          inline: true
        },
        {
          name: 'Joins',
          value: snew.slice(0,15).map(e=>{let t = {};t[e[0]] = 0;let q = {};q[e[0]] = message.guild.members.cache.get(e[0]);UserCheck(String(e[0]), t, q);return '<@'+e[0]+'> - '+t[e[0]]}).join('\n'),
          inline: true
        },
        {
          name: `Suspicious users (${sortable.length})`,
          value: a ? `Pos | User | Rating\n${a}` : "No users with a rating found"
        }
      );

    message.channel.send({
      embeds: [embed]
    });

  },
  UserCheck: UserCheck
};