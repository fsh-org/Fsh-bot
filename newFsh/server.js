/* -- New Server -- */
const PORT = 10002;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require("path");
const crypto = require("crypto")

const { useQueue, useTimeline } = require("discord-player");

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#';
  var charactersLength = characters.length;
  for (var i = 0; i < Number(length); i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  path: "/socket",
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cors());
module.exports = {
  testexecute(fsh) {
    const app = express();

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  },
  async execute(fsh) {
    /* -- Api endpoints -- */
    app.get("/api/:type", async function (req, res) {
      res.status(200);
      if (req.query["plain"] == "1") {
        res.header("Content-Type", "text/plain");
      } else {
        res.header("Content-Type", "application/json");
      }
      switch (req.params["type"]) {
        case "ping":
          res.send(req.query["plain"] == "1" ? fsh.client.ws.ping : `{"ping":"${fsh.client.ws.ping}"}`);
          break;
        case "info":
          let Fshdata = fsh.user_fsh.all();
          if (req.query["plain"] === "1") {
            res.send([
              fsh.client.ws.ping,
              fsh.client.uptime,
              fsh.client.guilds.cache.size,
              fsh.client.channels.cache.size,
              fsh.client.users.cache.size,
              Object.keys(Fshdata).length,
            ].join(","))
          } else {
            res.json({
              ping: fsh.client.ws.ping,
              uptime: fsh.client.uptime,
              servers: fsh.client.guilds.cache.size,
              channels: fsh.client.channels.cache.size,
              users: fsh.client.users.cache.size,
              'fsh-users': Object.keys(Fshdata).length
            })
          }
          break;
        case 'user-check':
          try {
            let que = req.query
            let mem = que["id"];
            let members = {};
            members[mem] = 0;
            let susers = {};
            susers[mem] = fsh.client.guilds.cache.get(que["server"]).members.cache.get(mem);

            require('./commands/admin/scan.js')
              .UserCheck(mem,members,susers);

            res.status(200)
            res.json({
              rating: members[mem],
              username: susers[mem].user.username
            })
          } catch (err) {
            res.status(500);
            res.json({"rating": null, "username": "None"})
          }
          break;
        case 'coupon-create':
          if (!req.query["key"]) {
            res.send("no")
            return;
          }
          if (req.query["key"] != process.env["apiKey"]) {
            res.send("No :)")
            return;
          }
          let code = makeid(10);
          code = `${req.query["prefix"]}-${code}`
          let sha = crypto.createHash('sha256').update(code).digest();
          sha = String(sha)
          fsh.coupon.set(sha, req.query["by"])
          res.json({
            coupon: code
          })
          break;
        default:
          // no option :<
          res.send("Fsh - Api endpoint not specified | if you are getting this from s4d, the api blocks are broken");
      }
    });

    /* Music */
    app.get("/hub/music", async function(req, res) {
      if (!req.query['guild_id']) {
        res.send('provide id');
        return;
      }
      let queue = useQueue(req.query['guild_id']);
      if (!queue) {
        res.send('unmeow');
        return;
      }
      const { timestamp, track, volume, paused } = useTimeline(req.query['guild_id']);
      let now = Date.now();
      res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Music panel - Fsh bot</title>
    <!-- Boiler plate------ -->
    <link rel="icon" href=/fsh/fsh.png" type="image/png">
    <meta name="description" content="Music currently playing in the server">
    <!-- ------- -->
    <link rel="stylesheet" href="/fsh/media/style.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:image" content="https://fsh.plus/fsh.png"/>
    <meta name="theme-color" content="#a89c9b">
    <!-- ------------------ -->
    <style>
      h1, h2 {
        text-align: center;
      }

      .card {
        display: flex;
        flex-direction: column;
        width: 30vw;
        height: 21.45vh;
        position: relative;
        margin: 20px auto;
        padding: 15px;
        border-radius: 1rem;
        background: linear-gradient(in oklch, rgba(0,0,0,0) 50%, rgba(0,0,0,0.75) 100%), url(${track.thumbnail.replace('https://i.ytimg.com','/ytimg')}), var(--bg-2);
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .card .name {
        color: var(--text-0);
        font-size: 125%;
        word-break: break-word;
      }
      .card .author {
        color: var(--text-1);
        margin: -4px 0;
      }
      .card .time {
        display: flex;
        margin: 16px 2px 4px 2px;
      }
      .pb {
        height: 8px;
        overflow: hidden;
        border-radius: 1rem;
        background-color: var(--bg-3);
      }
      .pb > div {
        height: 100%;
        width: var(--p, 0%);
        background-color: var(--accent-2);
      }
      .card > a {
        position: absolute;
        top: 7px;
        right: 7px;
      }
      .card > a svg {
        fill: var(--text-2);
      }
      .card > a svg:hover {
        fill: var(--text-1);
      }

      .tracks {
        display: flex;
        flex-direction:column
        gap: 10px;
        position: relative;
        width: fit-content;
        margin: 20px auto;
        padding: 15px;
        border-radius: 1rem;
        background-color: var(--bg-2);
      }
      .tracks > span {
        display: flex;
        flex-direction: column;
      }
      ol {
        margin: 0;
      }
      li > span:nth-child(2) {
        float: right;
        margin-left: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Currently ${paused ? 'paused' : 'playing'}</h1>
    <div class="card">
      <span style="flex:1"></span>
      <span>
        <p class="name">${track.cleanTitle}</p>
        <p class="author">by ${track.author.replace(' - Topic','')}</p>
      </span>
      <span class="time">
        <span style="flex:1">${timestamp.current.label}</span>
        <span>${timestamp.total.label}</span>
      </span>
      <div style="--p:${(timestamp.current.value / timestamp.total.value)*100}%" class="pb">
        <div></div>
      </div>${paused ? '' : `<script>
        function numToTime(num) {
          num = Math.floor(num/1000)
          return (num<60 ? '0' : Math.floor(num/60).toString().padStart(2, '0'))+':'+String(num%60).padStart(2, '0')
        }
        function progress() {
          let w = (Date.now() - ${now}) + ${timestamp.current.value};
          let p = w / ${timestamp.total.value};
          if (p>1) {
            location.reload();
            clearInterval(inter)
          }
          document.querySelector('.pb').style.setProperty('--p', (p*100)+'%');
          document.querySelector('.time').innerHTML = '<span style="flex:1">'+numToTime(w)+'</span><span>${timestamp.total.label}</span>';
        }
        var inter = setInterval(progress, 250)
      </script>`}
      <a href="${track.url}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"></path></svg></a>
    </div>
    <h2>Queue</h2>
    <div class="tracks">
      ${queue.tracks.data.length ? `<ol>
        ${queue.tracks.data.map(t=>`<li><span>${t.title}</span><span>by ${t.author}</span></li>`).join('\n')}
      </ol>` : '<p>Nothing in queue</p>'}
    </div>
  </body>
</html>`)
    })

    /* -- Weird page register -- */
    let paths = [
      ["index.html", "/"],
      ["api.html", "/api"],
      ["invite.html", "/invite"],
      ["robots.txt"]
    ];

    for (let index = 0; index < paths.length; index++) {
      let directory = paths[index][0];
      let url = paths[index][1] || `/${paths[index][0]}`;
      app.get(url, async (req, res) => {
        //it no got :<; it's only executing once?; hmm
        try {
          res.status(200);
          res.sendFile(path.join(__dirname, "../neWeb/page/" + directory));
        } catch (err) {
          res.status(500);
          res.send("err");
        }
      });
    }

    app.use('/hub', express.static('neWeb/page/hub'))
    app.use('/media', express.static('neWeb/media'))
    
    app.use(function(req, res) {
      res.sendFile(path.join(__dirname, '../neWeb/page/error.html'))
    })

    fsh.io = io;
    /* -- Socket.io stuff -- */
    io.on("connection", async(socket) => {
      if (socket.handshake.auth.token != process.env["sockauth"] || "") {
        socket.emit("chat", `Invalid token`);
        socket.disconnect();
      }
      socket.emit("chat", `User with id "${socket.id}" has connected`);
      socket.on("chat", async(message) => {
        if (message.channel) {
          if (message.message) {
            try {
              fsh.client.channels.cache
                .get(message.channel)
                .send(message.message);
              socket.emit("chat", `Server: Sent (${message.message}) to channel (${message.channel})`);
            } catch (err) {
              socket.emit("chat", `Server: ERR\n\n  ${err}`);
            }
            return;
          }
          return socket.emit("chat", "Server: No message");
        }
        return socket.emit("chat", "Server: No channel");
      });

      socket.on("api", async(data) => {
        await fsh.ws_api(fsh, socket, data)
      })
    });

    server.listen(PORT, () => {
      console.log("Server Online");
    });
  }
};