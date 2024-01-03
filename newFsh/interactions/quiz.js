// This just servers to make parham not use quiz at this point

const Discord = require("discord.js")
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  async execute(message) {
    /*if (message.content.includes('You mined ')) {
      try {
        if ('1098211925495664751' != Array.from(message.mentions.users)[0][0]) {
          return;
        }
      } catch (err) {
        return;
      }
      message.reply(`<t:${Math.floor(new Date()/1000)+11}:R>`)
      return;
    }*/
    // Is it a embed?
    try {
      if (!message.embeds[0]) return;
      if (!message.embeds[0].data) return;
    } catch (err) {
      return;
    }
    // is user blocked?
    /*try {
      if (['899368692301836319','1045764183288987689','694587798598058004','1187473719703109713'].includes(Array.from(message.mentions.users)[0][0])) {
        if (Array.from(message.mentions.users)[0][0] == '899368692301836319') {
          message.react('🇫')
          message.react('🇺')
        }
        return;
      };
    } catch (err) {
      return;
    }*/
    try {
      if (Array.from(message.mentions.users)[0][0] == '899368692301836319') {
        message.delete()
      }
      return;
    } catch (err) {
      return;
    }
    // user has quiz solver? if yes don't continue
    /*if (message.embeds[0].data.description.includes("Quiz Solver:")) return;
    // Log who
    try {
    console.log(Array.from(message.mentions.users)[0][0])
    } catch (err) {return}
    try {
      let hhh = ["1068572316986003466","816691475844694047","712342308565024818","1098211925495664751",'968570291611652096','968575449351454830','767102460673916958']
      if (!hhh.includes(Array.from(message.mentions.users)[0][0])) return;
    } catch (err) {
      return;
    }
    // get contents and check if quiz
    let a = String(message.embeds[0].data.description || "").replaceAll(" ","").match(/[0-9]{1,3}(\+|-|\*)[0-9]{1,3}/g)
    if (!a) return;
    if (!a[0]) return;
    a = a[0]

    // Do math
    if (a == "1+1") {
      a = "1"
    }
    if (a.includes("+")) {
      a = a.split("+");
      a = Number(a[0]) + Number(a[1]);
    } else {
      if (a.includes("-")) {
        a = a.split("-");
        a = Number(a[0]) - Number(a[1]);
      } else {
        if (a.includes("*")) {
          a = a.split("*");
          a = Number(a[0]) * Number(a[1]);
        } else {
          return;
        }
      }
    }*/
    /*let las = "";
    String(a).split('').forEach(e=>{
      let ff ='0️⃣,1️⃣,2️⃣,3️⃣,4️⃣,5️⃣,6️⃣,7️⃣,8️⃣,9️⃣'.split(',')[Number(e)]
      if (ff == las) ff="◀️";
      message.react(ff).then(async() => {
        await delay(5 * 1000);
        message.reactions.removeAll()
      })
      las = ff;
    })*/
   /* let ran = Math.floor(Math.random()*100)
    fs.writeFileSync('text/temp/'+ran+'txt', String(a));*/
    //let atc = new Discord.AttachmentBuilder(Buffer.from(String(a)), 'nosleep.txt');
    // Send the file as an attachment
    /*message.channel.send({
      //files: ['text/temp/'+ran+'txt'],
      files: [atc]
    });*/
    //message.channel.send("test")

    // Delete the temporary file
    //fs.unlinkSync('text/temp/'+ran+'txt');
    
    /*let b = [];
    String(a).split("").forEach(r=>{
      b.push('%3'+r)
    })
    a = b.join('')
    a = `https://placehold.co/400x200/ffffff/000000.png?font=open-sans&text=`+String(a);
    /*let embed = new Discord.EmbedBuilder()
      .setImage(`https://placehold.co/400x200/ffffff/000000.png?font=open-sans&text=`+String(a));*/
    /*message.channel.send(/*{embeds:[embed]}*//*a/*String(a).split('').join('​') + "** **"*//*).then(async (msg) => {
      //message.channel.permissionOverwrites.create('1183446047666737162',{ ViewChannel: true });
      await delay(5 * 1000);
      msg.delete();
    });*//*
    message.reply("Response:").then(async (msg) => {
      msg.edit(String(a).split('').join('​') + "** **");
      await delay(5 * 1000);
      msg.delete();
    });*/
  }
}