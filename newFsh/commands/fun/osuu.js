const Discord = require("discord.js");

function edr(er,tr) {
  if (er == 0) {
    return '';
  } else {
    return er+tr+' '
  }
}

function time_gud(time) {
  return `${edr(Math.floor(time / 31536000),'y')}${edr(Math.floor(time % 31536000 / 604800),'w')}${edr(Math.floor(time / 86400) % 7,'d')}${edr(Math.floor(time / 3600) % 24,'h')}${edr(Math.floor(time / 60) % 60,'m')}${edr(time % 60,'s')}`
}

module.exports = {
  name: ['osuu','osu','osuser','osuuser'],
  params: ['user/id', true],
  info: "Search for a osu account",
  category: "hidden",
  
  async execute(message, arguments2, fsh) {
    let data = await fetch(`https://osu.ppy.sh/api/get_user?k=${process.env['osu']}&u=${arguments2[0]}`);
    data = await data.json();
    data = data[0];

    if (!data) {
      message.reply('user not found')
    }

    var embed = new Discord.EmbedBuilder()
      .setTitle(`${data.username} :flag_${data.country.toLowerCase()}: (${data.user_id})`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setThumbnail('http://s.ppy.sh/a/'+data.user_id)
      .setURL('https://osu.ppy.sh/users/'+data.user_id)
      .setDescription(`Level: ${data.level || 0}
Maps played: ${data.playcount || 0} | Time played: ${time_gud(data.total_seconds_played || 0)}

Joined: <t:${Math.floor(new Date(data.join_date)/1000)}:R>`)
      .addFields({
        name: 'Performance',
        value: `Raw PP: ${data.pp_raw || 0}
PP rank:
> Global ${data.pp_rank || 'None'}
> Country ${data.pp_country_rank || 'None'}
Score: ${data.total_score || 0}
> (Ranked: ${data.ranked_score || 0})`,
        inline: true
      },
      {
        name: 'Acurracy',
        value: `Acurracy: ${Math.round(data.accuracy*1000)/1000 || 0}%
300 x${data.count300 || 0}
100 x${data.count100 || 0}
50 x${data.count50 || 0}`,
        inline: true
      },
      {
        name: 'Ranks',
        value: `SS x${data.count_rank_ss || 0}
SSH x${data.count_rank_ssh || 0}
S x${data.count_rank_s || 0}
SH x${data.count_rank_sh || 0}
A x${data.count_rank_a || 0}`,
        inline: true
      });

    message.channel.send({
      embeds: [embed]
    })
  }
};