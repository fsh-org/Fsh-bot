const Discord = require("discord.js");

function intToHex(code){
  const red = (code >> 16) & 255;
  const green = (code >> 8) & 255;
  const blue = code & 255;

  return `#${(1 << 24 | red << 16 | green << 8 | blue).toString(16).slice(1)}`;
};

function get_presences(member) {
  let presenceList = [];
  try {
    let presences = (member.presence.clientStatus);
    Object.keys(presences).forEach(key => {
      let thing = [];
      thing.push(key);
      thing.push((presences[String(key)]));
      presenceList.push(thing.join("-"));
    });
  } catch (err) {
    //if user has no presences, return the empty list
  }
  return presenceList;
}

module.exports = {
  name: "user",
  params: ["member", false],
  info: "Gives user info",
  category: "utility",

  async execute(message, arguments2, fsh) {
    
    let user = String(arguments2[0]).replace(/<@/g, "").replace(/>/g, "");
    if (!typeof Number(user) == "Number") return;
    user = fsh.client.users.cache.get(user) || message.author;
    let member = message.guild.members.cache.get(user.id);

    let usrbg = {};
    let response;
    if (!user.bot){
    response = await fetch(`https://discord.com/api/v8/users/${user.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bot ${fsh.client.token}`
      }
    })
    response = await response.json();

    if (!fsh.usrgbg) {
      usrbg = await fetch("https://raw.githubusercontent.com/AutumnVN/usrbg/main/usrbg.json")
      usrbg = await usrbg.json();
      fsh.usrbg = usrbg
    } else {
      usrbg = fsh.usrbg
    }
    } else {
      response = {}
    }
    let pres = "";
    get_presences(member).forEach(e => {
      pres = pres + fsh.emojis[String(e)]
    })

    let members = {};
    members[user.id] = 0;
    let susers = {};
    susers[user.id] = member;

    require('../admin/scan.js')
      .UserCheck(user.id,members,susers);
    
    var embed = new Discord.EmbedBuilder()
      .setTitle(`${user.globalName || user.username}${user.discriminator == "0" ? "" : `#${user.discriminator}`}${member.nickname != null ? ` [${member.nickname}]`: ""} ${pres}`)
      .setFooter({
        text: `V${fsh.version}`
      })
      .setTimestamp(new Date())
      .setColor(member.displayHexColor)
      .setThumbnail(user.displayAvatarURL({
        format: "png"
      }));
    let jos = Math.floor(new Date(member.joinedTimestamp)/1000);
    let jod = Math.floor(new Date(user.createdAt)/1000);
    embed.addFields(
      {
        name: "General",
        value: `Display name: ${user.globalName}
Username: ${user.username}${user.discriminator.length < 3 ? "" : `#${user.discriminator}`}
Nickname: ${member.nickname || "None"}
Id: ${user.id}
Ping: <@${user.id}>
Suspiciousness: ${members[user.id]}`,
        inline: true
      },
      {
        name: "Conditionals",
        value: `Bot: ${user.bot ? "True" : "False"}
System: ${user.system ? `True` : "False"}
Administrator: ${member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) ? `True` : "False"}
Timed out: ${member.isCommunicationDisabled() ? "True" : "False"}
${String(member.communicationDisabledUntilTimestamp/1000) == "0" ? "" : `Ends: <t:${Math.floor(member.communicationDisabledUntilTimestamp/1000)}:R>`}`,
        inline: true
      },
      {
        name: "Links",
        value: `Avatar: ${member.displayAvatarURL({dynamic: true})}
Banner: ${response.banner ? `https://cdn.discordapp.com/banners/${user.id}/${response.banner}.${response.banner.includes("a_") ? "gif" : "png"}` : usrbg[user.id] ? `${usrbg[user.id]} [usrbg]` : "None"}
User url: https://discord.com/users/${user.id}`
      },
      {
        name: `Dates`,
        value: `${member ? `> Joined server: <t:${jos}:R> (<t:${jos}:t> | <t:${jos}:d>)` : "User not in server"}
> Joined discord: <t:${jod}:R> (<t:${jod}:t> | <t:${jod}:d>)`
      }
    );
    
    let roles = [];
    let list = "";
    roles = Array.from(member.roles.cache).sort((a,b)=>{return -(Number(a[0].rawPosition)-Number(b[0].rawPosition))});
    roles.slice(0,35).forEach(rol => {
      list = list + `<@&${rol[0]}> `;
    })
    if (roles.length != roles.slice(0,35).length) {
      list = list + `[${roles.length - roles.slice(0,35).length} more]`
    }
    embed.addFields(
      {
        name: `Roles (${member.roles.cache.size})`,
        value: `Highest: <@&${member.roles.highest.id}> (color: \`${intToHex(member.roles.highest.color)}\`)
${list}`
      }
    )
    
    if (response.banner) {
      embed.setImage(`https://cdn.discordapp.com/banners/${user.id}/${response.banner}.${response.banner.includes("a_") ? "gif" : "png"}`)
    } else {
      if (usrbg[user.id]) {
        embed.setImage(usrbg[user.id])
      }
    }
    
    message.channel.send({
      embeds: [embed]
    })
  }
};