const Discord = require("discord.js");

function feat(f) {
  let n = {
    GUILD_ONBOARDING: 'Onboarding',
    PREVIEW_ENABLED: 'Server preview',
    THREADS_ENABLED: 'Threads',
    COMMUNITY: 'Community server',
    SOUNDBOARD: 'Soundboard',
    NEWS: 'Announcement channels',
    AUTOMOD_TRIGGER_USER_PROFILE: 'User profile automod',
    GUILD_SERVER_GUIDE: 'Server guide',
    GUILD_ONBOARDING_EVER_ENABLED: 'Onboarding tried',
    NEW_THREAD_PERMISSIONS: 'Thread permisions v2',
    AUTO_MODERATION: 'Automod',
    GUILD_ONBOARDING_HAS_PROMPTS: 'Onboarding prompts',
    MEMBER_VERIFICATION_GATE_ENABLED: 'Verification gate',
    TEXT_IN_VOICE_ENABLED: 'Text in voice',
    WELCOME_SCREEN_ENABLED: 'Welcome screen',
    CHANNEL_ICON_EMOJIS_GENERATED: 'Auto channel icon',
    ANIMATED_BANNER: 'Animated banner',
    ANIMATED_ICON: 'Animated icon',
    APPLICATION_COMMAND_PERMISSIONS_V2: 'Bot command permission v2',
    BANNER: 'Banner',
    CREATOR_MONETIZABLE_PROVISIONAL: 'Server monitization',
    CREATOR_STORE_PAGE: 'Server store',
    DEVELOPER_SUPPORT_SERVER: 'Bot support server',
    DISCOVERABLE: 'Discoverable',
    FEATURABLE: 'Featurable',
    HAS_DIRECTORY_ENTRY: 'Channel directory',
    HUB: 'Student hub',
    INVITE_SPLASH: 'Invite splash',
    INVITES_DISABLED: 'Disabled invites',
    LINKED_TO_HUB: 'Student hub linked',
    MEMBER_VERIFICATION_GATE_ENABLED: 'Member verification gate',
    MONETIZATION_ENABLED: 'Monitization',
    MORE_STICKERS: 'More stickers',
    PARTNERED: 'Partnered',
    PRIVATE_THREADS: 'Private threads',
    RAID_ALERTS_DISABLED: 'Raid alerts off',
    RELAY_ENABLED: 'Relay',
    ROLE_ICONS: 'Role icons',
    ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE: 'Role subscriptions for purchased',
    ROLE_SUBSCRIPTIONS_ENABLED: 'Role subscriptions',
    TICKETED_EVENTS_ENABLED: 'Ticketed events',
    VIP_REGIONS: 'Vip regions',
    VANITY_URL: 'Vanity url',
    VERIFIED: 'Verified'
  };
  return (n[f] ? n[f] : 'U:'+f)
}

module.exports = {
  name: "server",
  info: "Gives server info",
  category: "utility",

  async execute(message, arguments2, fsh) {
    let g = message.guild;

    let owner = await g.fetchOwner();
    let created = Math.floor(g.createdAt/1000);
    let inv = await g.invites.fetch();

    var embed = new Discord.EmbedBuilder()
      .setTitle(g.name)
      .setFooter({
        text: `V${fsh.version}`
      })
      .setTimestamp(new Date())
      .setColor('#888888')
      .setThumbnail(g.iconURL({ dynamic: true }))
      .setImage(g.bannerURL({ dynamic: true }))
      .setDescription(`Acronym: ${g.nameAcronym}
Id: ${g.id}
Created: <t:${created}:R> (<t:${created}:t> | <t:${created}:d>)
Owner: ${owner} (${owner.id})
Vanity: ${g.vanityURLCode || 'None'} (Uses: ${g.vanityURLUses || 'None'})
Available: ${g.available}
Partner: ${g.partnered}
Verified: ${g.verified}
Language: ${g.preferredLocale}
${g.description || 'No description'}`);

    embed.addFields(
      {
        name: "Stats",
        value: `Members: ${g.memberCount} (Large: ${g.large})
> People: ${g.members.cache.filter(member => !member.user.bot).size}
> Bots: ${g.members.cache.filter(member => member.user.bot).size}
Roles: ${g.roles.cache.size}
Channels: ${g.channels.cache.filter(channel => ![10, 11, 12].includes(channel.type)).size} (${g.channels.cache.size})
> Text: ${g.channels.cache.filter(channel => [0, 1, 3, 4, 5, 14, 15, 16].includes(channel.type)).size}
> Thread: ${g.channels.cache.filter(channel => [10, 11, 12].includes(channel.type)).size}
> Voice: ${g.channels.cache.filter(channel => [2, 13].includes(channel.type)).size}
Emojis: ${g.emojis.cache.size}
Stickers: ${g.stickers.cache.size}
Invites: ${inv.size}`,
        inline: true
      },
      {
        name: "Maximums",
        value: `Members: ${g.maximumMembers || 'None'}
Presences: ${g.maximumPresences || 'None'}
Bitrate: ${g.maximumBitrate || 'None'}
Video users: ${g.maxVideoChannelUsers || 'None'}
Stage video users: ${g.maxStageVideoChannelUsers || 'None'}`,
        inline: true
      },
      {
        name: "Moderation",
        value: `Rules: ${g.rulesChannelId ? '<#'+g.rulesChannelId+'>' : 'None'}
Public updates: ${g.publicUpdatesChannelId ? '<#'+g.publicUpdatesChannelId+'>' : 'None'}
Safety alerts: ${g.safetyAlertsChannelId ? '<#'+g.safetyAlertsChannelId+'>' : 'None'}
System: ${g.systemChannelId ? '<#'+g.systemChannelId+'>' : 'None'}
Mfa: ${g.mfaLevel == 1 ? 'Enforced' : 'None'}
Verification: ${['None', 'Verified email', 'At least 5 discord minutes', 'Member for atleast 10 minutes', 'Verified phone'][g.verificationLevel]}
NSFW level: ${['Default', 'Explicit', 'Safe', 'Age restricted'][g.nsfwLevel]}
Explicit filter: ${['Disabled', 'Members without roles', 'All members'][g.explicitContentFilter]}
Default notifications: ${['All mesages', 'Only mentions'][g.defaultMessageNotifications]}`,
        inline: true
      },
      {
        name: "Links",
        value: `Server link: https://discord.com/channels/${g.id}
Icon: ${g.iconURL({ dynamic: true }) || 'None'}
Banner: ${g.bannerURL({ dynamic: true }) || 'None'}
Widget: ${g.widgetImageURL({ dynamic: true}) || 'None'}`,
        inline: false
      },
      {
        name: "Boost",
        value: `Boost bar: ${g.premiumProgressBarEnabled}
Tier: ${g.premiumTier}
Boosts: ${g.premiumSubscriptionCount}`,
        inline: true
      },
      {
        name: "AFK",
        value: `Timeout: ${g.afkTimeout > 59 ? Math.floor(g.afkTimeout/60)+' minutes' : g.afkTimeout+' seconds'}
Channel: ${g.afkChannelId ? '<#'+g.afkChannelId+'>' : 'None'}`,
        inline: true
      },
      {
        name: "Widget",
        value: `Enabled: ${g.widgetEnabled || 'false'}
Channel: ${g.widgetChannelId ? '<#'+g.widgetChannelId+'>' : 'None'}`,
        inline: true
      },
      {
        name: "Features",
        value: g.features.map(e => feat(e)).sort().join(', '),
        inline: false
      }
    );

    let roles = [];
    let list = "";
    roles = Array.from(g.roles.cache).sort((a,b)=>{return -(Number(a[1].rawPosition)-Number(b[1].rawPosition))});
    roles.slice(0,40).forEach(rol => {
      list = list + `<@&${rol[0]}> `;
    })
    if (roles.length != roles.slice(0,40).length) {
      list = list + `[${roles.length - roles.slice(0,40).length} more]`
    }
    embed.addFields(
      {
        name: "Roles ("+g.roles.cache.size+")",
        value: list,
        inline: false
      }
    )

    message.channel.send({
      embeds: [embed]
    })
  }
};