const Discord = require('discord.js');
const fs = require('node:fs');

let badList = [];
let vewyBadList = [];
let lastRead = 0;

const bots = {
  arcane: '437808476106784770',
  'captcha.bot': '512333785338216465',
  'carl-bot': '235148962103951360',
  'dank memer': '270904126974590976',
  dyno: '155149108183695360',
  fsh: '1068572316986003466',
  mee6: '159985870458322944'
};
const adlinks = ['youtbe.com','youtu.be','twitch.tv','instagram.com','facebook.com','twitter.com','x.com','discord.gg'];
const cry = ['bitcoin',' eth','doge','monero','usd'];

function anyInclude(array, str) {
  let inc = false;
  array.forEach(n=>{
    if (n.includes(str)) inc = true;
  });
  return inc;
}

function UserCheck(user, member) {
  let sus = 0;
  let now = Date.now();
  let id = user.id;
  let names = [
    String(user.username).toLowerCase(),
    String(user.globalName).toLowerCase()??'',
    String(member?.nickname??'').toLowerCase()
  ].filter(n=>n.length);
  if ((lastRead+5*60*1000)<now) { // 5 mins
    badList = fs.readFileSync('text/bad.txt', 'utf8').split(',');
    vewyBadList = fs.readFileSync('text/vewybad.txt', 'utf8').split(',');
  }
  // Bad lists add much sus
  if (badList.includes(id)) sus += 25;
  if (vewyBadList.includes(id)) sus += 1000;
  // If spammer (Discord) +10 sus
  if (user.flags&&user.flags.has&&user.flags.has(Discord.UserFlags.Spammer)) sus += 10;
  // User newness
  let creation = new Date(user.createdAt).getTime();
  if ((creation+4*30*24*60*60*1000)>now) sus += 3; // Less than 4 months +3 sus
  if ((creation+14*24*60*60*1000)>now) sus += 2; // Less than 14 days +2 sus + ^
  // No pfp +1 sus
  try {
    if (String((member??user)?.displayAvatarURL()??'').includes('embed/')) sus += 1;
  } catch(err) {
    // Ignore :3
  }
  // Unverified bot +1 sus
  if (user.bot && user.flags && !user.flags.has(Discord.UserFlags.VerifiedBot)) sus += 1;
  // If discrim
  if ((/[^0-9][0-9]{4}$/m).test(names[0])) sus += 4;
  if ((/_[0-9]{5}$/m).test(names[0])) sus += 2;
  // If "giveaway", "nitro", "free", "bio" (not bot) or "discord", "steam","google" (yes bot) in name +3 sus each
  if (!user.bot) {
    if (anyInclude(names, 'giveaway')) sus += 3;
    if (anyInclude(names, 'nitro')) sus += 3;
    if (anyInclude(names, 'free')) sus += 3;
    if (anyInclude(names, 'bio')) sus += 3;
  }
  if (anyInclude(names, 'discord')) sus += 3;
  if (anyInclude(names, 'steam')) sus += 3;
  if (anyInclude(names, 'google')) sus += 3;
  // Questionable symbols +2 sus (this may give false positives)
  if (anyInclude(names, 'ζ')) sus += 2;
  if (anyInclude(names, 'μ')) sus += 2;
  // Impersonating bots +5
  Object.keys(bots).forEach(b=>{
    if (anyInclude(names, b)) {
      if (user.bot&&bots[b]===id) return;
      sus += 5;
    }
  })
  // N word +8
  if (anyInclude(names, 'nigg')) sus += 8;
  // if name_num_num (spam) account +8
  let reg = /[a-zA-Z]{2,10}_[0-9]{4,}_[0-9]{4,}/g;
  names.forEach(n=>{
    if (reg.test(n)) sus += 8;
  });
  // Scam account +8
  if (anyInclude(names, '𝐋𝐈𝐍𝐊 𝐈𝐍 𝐁𝐈𝟎')) sus += 8;
  if (anyInclude(names, '𝐀𝐈𝐑𝐃𝐑𝐎𝐏 𝐋𝐈𝐕𝐄')) sus += 8;
  if (anyInclude(names, 'check bio')) sus += 8;
  if (anyInclude(names, 'check my bio')) sus += 8;
  // Link for possible ad +4
  adlinks.forEach(lnk=>{
    if (anyInclude(names, lnk)) sus += 4;
  });
  // If crypto/currency +3 each
  cry.forEach(cr=>{
    if (anyInclude(names, cr)) sus += 3;
  });
  // Nick / Global name to be placed on top +3
  names.forEach(n=>{
    if (n==='!') sus += 3;
  })
  // Word DM in status +4
  let pres = user?.presence;
  if (pres&&pres.activities) {
    pres = pres.activities.filter(e=>e.type===4);
    if (pres[0]&&pres[0].state) {
      pres = pres[0].state.toLowerCase();
      if (pres.includes('dm')) sus += 4;
      // Remove some false positives
      if (pres.includes('word')) sus -= 2;
      if (pres.includes('potato') || pres.includes('uwu')) sus -= 2;
    }
  }
  return sus;
}

module.exports = UserCheck;