const Discord = require('discord.js');
const UserCheck = require('../../user-check.js');

function intToHex(code){
  return `#${code.toString(16).padStart(6, '0')}`;
};
function hexToInt(code){
  return parseInt(code.replace('#',''), 16);
};

function get_presences(member) {
  let presenceList = [];
  try {
    let presences = member.presence.clientStatus;
    Object.keys(presences).forEach(key => {
      let thing = [];
      thing.push(key);
      thing.push(presences[String(key)]);
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
    if (typeof Number(user) !== "number") return;
    try {
      user = await fsh.client.users.fetch(user, { force: true });
    } catch(err) {
      user = message.author
    }
    let member = message.guild.members.cache.get(user.id);

    let pres = "";
    get_presences(member).forEach(e => {
      pres = pres + fsh.emojis[String(e)]
    });

    let sus = UserCheck(user,member);

    let base = new Discord.ContainerBuilder()
      .setAccentColor(hexToInt(member.displayHexColor));

    let user_join = Math.floor(new Date(member.joinedTimestamp)/1000);
    let user_create = Math.floor(new Date(user.createdAt)/1000);

    let pfp = new Discord.ThumbnailBuilder()
      .setURL(user.displayAvatarURL({ format: "png" }))
      .setDescription((user.globalName??user.username)+"'s name");

    let user_section = new Discord.SectionBuilder()
      .addTextDisplayComponents([
        new Discord.TextDisplayBuilder().setContent(`## ${user.globalName??user.username}${user.primaryGuild?.tag?` [${user.primaryGuild.tag}]`:''} ${pres}`),
        new Discord.TextDisplayBuilder().setContent(`-# ${user.id}
Display: ${user.globalName??user.username} (${member.nickname??'No nickname'})
Username: ${user.username}${user.discriminator.length<3?'':`#${user.discriminator}`}
Ping: <@${user.id}>
Conditionals:${member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)?' Admin':''}${user.verified?' Verified':''}${user.system?' System':''}${user.bot?' Bot':''}
${member.isCommunicationDisabled()?`:warning: Timed out. Ends: <t:${Math.floor(member.communicationDisabledUntilTimestamp/1000)}:R>\n`:''}Suspiciousness: ${sus}`),
        new Discord.TextDisplayBuilder().setContent(`${member?`> Joined server: <t:${user_join}:R> (<t:${user_join}:t> | <t:${user_join}:d>)`:'User not in server'}
> Joined discord: <t:${user_create}:R> (<t:${user_create}:t> | <t:${user_create}:d>)`)
      ])
      .setThumbnailAccessory(pfp);

    base.addSectionComponents([user_section]);

    base.addSeparatorComponents(new Discord.SeparatorBuilder());

    let roles = [];
    let rolMax = 30;
    let list = '';
    roles = Array.from(member.roles.cache).toSorted((a,b)=>b[1].rawPosition-a[1].rawPosition);
    roles.slice(0,rolMax).forEach(rol => {
      list = list + `<@&${rol[0]}> `;
    });
    if (roles.length>rolMax) list = list + `[${roles.length-rolMax} more]`;
    let role = new Discord.TextDisplayBuilder()
      .setContent(`${member.roles.cache.size} Roles - Highest: <@&${member.roles.highest.id}> (color: \`${intToHex(member.roles.highest.colors.primaryColor)}${member.roles.highest.colors.secondaryColor?' > '+intToHex(member.roles.highest.colors.secondaryColor):''}${member.roles.highest.colors.tertiaryColor?' > '+intToHex(member.roles.highest.colors.tertiaryColor):''}\`)
${list}`);

    base.addTextDisplayComponents([role]);

    base.addSeparatorComponents(new Discord.SeparatorBuilder());

    let links = new Discord.ActionRowBuilder()
      .addComponents([
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Link)
          .setLabel('User')
          .setURL(`https://discord.com/users/${user.id}`),
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Link)
          .setLabel('Avatar')
          .setURL(member.displayAvatarURL({dynamic: true}))
      ]);
    if (user.avatarDecorationData) {
      links.addComponents([
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Link)
          .setLabel('Avatar Deco')
          .setURL(user.avatarDecorationURL())
      ]);
    }
    if (fsh.usrbg.has(user.id) || member.banner) {
      links.addComponents([
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Link)
          .setLabel('Banner')
          .setURL(fsh.usrbg.has(user.id)?fsh.usrbg.get(user.id):member.displayBannerURL({dynamic: true}))
      ]);
    }
    if (user.collectibles&&user.collectibles.nameplate) {
      links.addComponents([
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Link)
          .setLabel('Nameplate')
          .setURL(`https://cdn.discordapp.com/assets/collectibles/${user.collectibles.nameplate.asset}asset.webm`)
      ]);
    }

    base.addActionRowComponents([links]);

    if (fsh.usrbg.has(user.id) || member.banner) {
      let banner = new Discord.MediaGalleryBuilder().addItems([
        new Discord.MediaGalleryItemBuilder()
          .setURL(fsh.usrbg.has(user.id)?fsh.usrbg.get(user.id):member.displayBannerURL({dynamic: true}))
          .setDescription((user.globalName??user.username)+"'s banner")
      ]);
      base.addMediaGalleryComponents([banner]);
    }

    message.channel.send({
      flags: Discord.MessageFlags.IsComponentsV2,
      components: [base],
      allowedMentions: {
        parse: [],
        users: [],
        roles: []
      }
    });
  }
};