/* -- New Server -- */
const PORT = 3000;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require("path");
const crypto = require("crypto")

function listsGetRandomItem(list, remove) {
  var x = Math.floor(Math.random() * list.length);
  if (remove) {
    return list.splice(x, 1)[0];
  } else {
    return list[x];
  }
}

function listsRepeat(value, n) {
  var array = [];
  for (var i = 0; i < n; i++) {
    array[i] = value;
  }
  return array;
}

function mathRandomInt(a, b) {
  if (a > b) {
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}

function listsGetSortCompare(type, direction) {
  var compareFuncs = {
    NUMERIC: function (a, b) {
      return Number(a) - Number(b);
    },
    TEXT: function (a, b) {
      return a.toString() > b.toString() ? 1 : -1;
    },
    IGNORE_CASE: function (a, b) {
      return a.toString().toLowerCase() > b.toString().toLowerCase() ? 1 : -1;
    },
  };
  var compare = compareFuncs[type];
  return function (a, b) {
    return compare(a, b) * direction;
  };
}

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

    /* -- Weird page register -- */
    let paths = [
      ["index.html", "/"],
      ["api.html", "/api"],
      ["invite.html", "/invite"],
      ["hub.html", "/hub"],
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
              socket.emit(
                "chat",
                `Server: Sent (${message.message}) to channel (${message.channel})`
              );
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