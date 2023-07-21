/* -- chat -- */ /*
This file should be cleaned up
just copied s4d code
i need to change some things


*/ /* -------- */

/* -- New Server -- */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require("path");

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
    // Swap a and b to ensure a is smaller.
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

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {path: '/socket'});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
// oh S4D_WEBSITECREATION_EXPRESS_app.listen(S4D_APP_WEBSITE_HOSTING_PORT); that? idk strange; line 133; not even api endpoinst work, none .get work;
//we do, it says "server online"
module.exports = {
  testexecute(fsh) {
    const app = express();
    const port = 3000;

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  },
  async execute(fsh) {
    /* -- Get css and assets -- */
    app.get("/media", async function (req, res) {
      if (req.query["media"] != null) {
        if (
          req.query["media"].includes("..") ||
          req.query["media"].includes(".js")
        ) {
          res.status(Number(400));
          res.send("err");
        } else {
          try {
            res.status(Number(200));
            res.sendFile(
              path.join(
                __dirname,
                String("../neWeb/media/" + req.query["media"])
              )
            );
          } catch (err) {}
        }
      } else {
        res.status(Number(400));
        res.send("err");
      }
    });

    /* -- Api endpoints -- */
    app.get("/api/:type", async function (req, res) {
      res.status(Number(200));
      if (req.query[String("plain")] == "1") {
        res.header("Content-Type", "text/plain");
      } else {
        res.header("Content-Type", "application/json");
      }
      switch (req.params["type"]) {
        case "thing":
          res.send("test");
          break;
        case "ping":
          res.send(
            String(
              req.query[String("plain")] == "1"
                ? fsh.client.ws.ping
                : ['{"ping":"', fsh.client.ws.ping, '"}'].join("")
            )
          );
          //res.send(String(fsh.client.ws.ping))
          break;
        case "info":
          let Fshdata = fsh.user_fsh.all();
          res.send(
            String(
              req.query[String("plain")] == "1"
                ? [
                    fsh.client.ws.ping,
                    fsh.client.uptime,
                    fsh.client.guilds.cache.size,
                    fsh.client.channels.cache.size,
                    fsh.client.users.cache.size,
                    Object.keys(Fshdata).length,
                  ].join(",")
                : [
                    '{"ping":"',
                    fsh.client.ws.ping,
                    '","uptime":"',
                    fsh.client.uptime,
                    '","servers":"',
                    fsh.client.guilds.cache.size,
                    '","channels":"',
                    fsh.client.channels.cache.size,
                    '","users":"',
                    fsh.client.users.cache.size,
                    '","fsh-users":"',
                    Object.keys(Fshdata).length,
                    '"}',
                  ].join("")
            )
          );
          break;
        case "other":
          break;
        default:
          // no option :<
          res.send(
            "Fsh Bot - Discord v14 - Bot is currently being reworked which means that some of the api doesn't work"
          );
      }
    });

    /* -- Weird page register -- */
    let paths = [
      ["api.html", "/api"],
      ["invite.html", "/invite"],
      ["robots.txt"],
      ["tos.html", "/tos"],
      ["main.html", "/"],
      //['pp.html', '/pp'], // privacy policy not done
    ];
    // do we update bodyParser?; i guess its "built in" now, just gotta figure out how; npm i?, ima try, done; no no no; what?; im fixin, it just uses a function now; fixed; ok;

    for (let index = 0; index < paths.length; index++) {
      let directory = paths[index][0];
      let url = paths[index][1] || `/${paths[index][0]}`;
      app.get(url, async (req, res) => {
        //it no got :<; it's only executing once?; hmm
        try {
          res.status(Number(200));
          res.sendFile(
            path.join(__dirname, String("../neWeb/page/" + directory))
          );
        } catch (err) {
          res.status(Number(500));
          res.send("err");
        }
      });
    }

    app.get("/t", async (req, res) => {
      console.log("der");
    });

    fsh.io = io
    /* -- Socket.io stuff -- */
    io.on('connection', (socket) => {
      if(socket.handshake.auth.token != process.env['sockauth']){
        socket.emit('chat', `Invalid token`)
        socket.disconnect();
      }
      socket.emit('chat', `User with id: "${socket.id}" has connected`)
      socket.on('chat', message => {
        io.emit('chat', message)
      })
    });

    server.listen(3000, () => {
      console.log("Server Online");
    });
  },
};

//hallo; hallo, why comment; this is old section rememebr; oh ye dementia; ill move the new to the top of the file; ok, wait did you do the api and things?; the wha?; oh you moved code, me confused;

/* -- Website -- 

const S4D_WEBSITECREATION_EXPRESS = require("express");
const S4D_WEBSITECREATION_bodyParser = require("body-parser");
const S4D_WEBSITECREATION_cors = require("cors");
var S4D_WEBSITECREATION_path = require("path");
const S4D_WEBSITECREATION_EXPRESS_app = S4D_WEBSITECREATION_EXPRESS();

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
    // Swap a and b to ensure a is smaller.
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

 IMPORTED - S4D Website Hosting Dependencies 
let S4D_APP_WEBSITE_HOSTING_PORT = 8080;

S4D_WEBSITECREATION_EXPRESS_app.use(S4D_WEBSITECREATION_cors());
S4D_WEBSITECREATION_EXPRESS_app.use(
  S4D_WEBSITECREATION_bodyParser.urlencoded({
    extended: false,
  })
);
S4D_WEBSITECREATION_EXPRESS_app.use(S4D_WEBSITECREATION_bodyParser.json());

S4D_WEBSITECREATION_EXPRESS_app.get("/", async function (req, res) {
  res.sendFile(
    S4D_WEBSITECREATION_path.join(__dirname, String("../neWeb/page/main.html"))
  );
});
S4D_WEBSITECREATION_EXPRESS_app.get("/tos", async function (req, res) {
  res.sendFile(
    S4D_WEBSITECREATION_path.join(__dirname, String("../neWeb/page/tos.html"))
  );
});
S4D_WEBSITECREATION_EXPRESS_app.get("/pp", async function (req, res) {
  res.sendFile(
    S4D_WEBSITECREATION_path.join(__dirname, String("../neWeb/page/pp.html"))
  );
});
S4D_WEBSITECREATION_EXPRESS_app.get("/invite", async function (req, res) {
  res.sendFile(
    S4D_WEBSITECREATION_path.join(__dirname, String("../neWeb/page/invite.html"))
  );
});
S4D_WEBSITECREATION_EXPRESS_app.all("/auth", async function (req, res) {
  if (req.query[String("error")] == null) {
    var process = spawn("python", ["./identify.py", req.query[String("code")]]);
  }
  res.send(
    String(
      String(
        String(fs.readFileSync("../neWeb/page/pp.html", "utf8")).replaceAll(
          "{c?}",
          String(
            req.query[String("error")] == null ? "successful" : "unsuccessful"
          )
        )
      ).replaceAll(
        "{s}",
        String(
          req.query[String("error")] == null
            ? String(`<hr>
        <p>Thanks for adding Fsh to {ser}!</p>
        <p>now head to your server and config fsh with config command</p>`).replaceAll(
                "{ser}",
                String(
                  s4d.client.guilds.cache.get(req.query[String("guild_id")])
                    .name
                )
              )
            : `<hr>
        <p>Failed to Auth/Invite Fsh</p>
        <p><a href="https://fsh-bot.frostzzone.repl.co/invite">click here to try again</a></p>`
        )
      )
    )
  );
});
S4D_WEBSITECREATION_EXPRESS_app.get("/robots.txt", async function (req, res) {
  res.sendFile(
    S4D_WEBSITECREATION_path.join(__dirname, String("../neWeb/page/robots.txt"))
  );
});
S4D_WEBSITECREATION_EXPRESS_app.get("/api", async function (req, res) {
  res.sendFile(
    S4D_WEBSITECREATION_path.join(__dirname, String("../neWeb/page/api.html"))
  );
});
S4D_WEBSITECREATION_EXPRESS_app.use(function (req, res) {
  res.sendFile(
    S4D_WEBSITECREATION_path.join(__dirname, String("../neWeb/page/error.html"))
  );
});
S4D_WEBSITECREATION_EXPRESS_app.get("/asset", async function (req, res) {
  if (
    ((req.query[String("media")] || "").endsWith(".png" || "") ||
      (req.query[String("media")] || "").endsWith(".jpg" || "")) &&
    !(
      String(req.query[String("media")]).includes(String("..")) ||
      String(req.query[String("media")]).includes(String("js")) ||
      String(req.query[String("media")]).includes(String("json")) ||
      String(req.query[String("media")]).includes(String("index"))
    )
  ) {
    if (
      String(
        fs.readFileSync(
          "web/assets/" + String(req.query[String("media")]),
          "utf8"
        )
      ).includes(String("s4d")) ||
      !(
        ("web/assets/" + String(req.query[String("media")])).substring(
          ("web/assets/" + String(req.query[String("media")])).lastIndexOf(".")
        ) == ".png" ||
        ("web/assets/" + String(req.query[String("media")])).substring(
          ("web/assets/" + String(req.query[String("media")])).lastIndexOf(".")
        ) == ".jpg"
      ) ||
      fs.readFileSync(
        "web/assets/" + String(req.query[String("media")]),
        "utf8"
      ) == null
    ) {
      res.send(String("file not found"));
    } else {
      res.header("Content-Type", "image/png");
      res.sendFile(
        S4D_WEBSITECREATION_path.join(
          __dirname,
          String("../neWeb/assets/" + String(req.query[String("media")]))
        )
      );
    }
  } else {
    res.send(String("file not found"));
  }
});
S4D_WEBSITECREATION_EXPRESS_app.get("/css", async function (req, res) {
  if (
    (req.query[String("css")] || "").endsWith(".css" || "") &&
    !(
      String(req.query[String("css")]).includes(String("..")) ||
      String(req.query[String("css")]).includes(String("js")) ||
      String(req.query[String("css")]).includes(String("json")) ||
      String(req.query[String("css")]).includes(String("index"))
    )
  ) {
    if (
      String(
        fs.readFileSync("web/css/" + String(req.query[String("css")]), "utf8")
      ).includes(String("s4d")) ||
      !(
        ("web/css/" + String(req.query[String("css")])).substring(
          ("web/css/" + String(req.query[String("css")])).lastIndexOf(".")
        ) == ".css"
      ) ||
      fs.readFileSync("web/css/" + String(req.query[String("css")]), "utf8") ==
        null
    ) {
      res.send(String("file not found"));
    } else {
      res.header("Content-Type", "text/css");
      res.sendFile(
        S4D_WEBSITECREATION_path.join(
          __dirname,
          String("../neWeb/css/" + String(req.query[String("css")]))
        )
      );
    }
  } else {
    res.send(String("file not found"));
  }
});
S4D_WEBSITECREATION_EXPRESS_app.get("/api/:type", async function (req, res) {
  res.status(Number(200));
  if (req.query[String("plain")] == "1") {
    res.header("Content-Type", "text/plain");
  } else {
    res.header("Content-Type", "application/json");
  }
  switch (req.params[String("type")]) {
    case "ping":
      res.send(
        String(
          req.query[String("plain")] == "1"
            ? s4d.client.ws.ping
            : ['{"ping":"', s4d.client.ws.ping, '"}'].join("")
        )
      );

      break;
    case "info":
      var JSONdataS4D = JSON.parse(
        fs.readFileSync("../databases/fsh_count.json")
      );
      res.send(
        String(
          req.query[String("plain")] == "1"
            ? [
                s4d.client.ws.ping,
                s4d.client.uptime,
                s4d.client.guilds.cache.size,
                s4d.client.channels.cache.size,
                s4d.client.users.cache.size,
                Object.keys(JSONdataS4D).length,
              ].join(",")
            : [
                '{"ping":"',
                s4d.client.ws.ping,
                '","uptime":"',
                s4d.client.uptime,
                '","servers":"',
                s4d.client.guilds.cache.size,
                '","channels":"',
                s4d.client.channels.cache.size,
                '","users":"',
                s4d.client.users.cache.size,
                '","fsh-users":"',
                Object.keys(JSONdataS4D).length,
                '"}',
              ].join("")
        )
      );

      break;
    case "fish":
      
                Depracated
              
      res.send(
        String(
          req.query[String("plain")] == "1"
            ? listsGetRandomItem(
                [
                  "https://media.tenor.com/R5IECfIf34YAAAAd/fish-spinning.gif",
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Ktzt82dpd6GJSO4mGDAHC5AV8hgZcgOmxA",
                ],
                false
              )
            : [
                '{"image":"',
                listsGetRandomItem(
                  [
                    "https://media.tenor.com/R5IECfIf34YAAAAd/fish-spinning.gif",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Ktzt82dpd6GJSO4mGDAHC5AV8hgZcgOmxA",
                  ],
                  false
                ),
                '"}',
              ].join("")
        )
      );

      break;
    case "filter":
      d = true;
      var j_list = [];
      for (var j_index in j_list) {
        j = j_list[j_index];
        if (String(req.query[String("text")]).includes(String(j))) {
          d = false;
          break;
        }
      }
      res.send(
        String(
          req.query[String("plain")] == "1"
            ? [d, ",", !d].join("")
            : ['{"clean":"', d, '","dirty":"', !d, '"}'].join("")
        )
      );

      break;
    case "censor":
      d = req.query[String("text")];
      var j_list2 = [];
      for (var j_index2 in j_list2) {
        j = j_list2[j_index2];
        d = String(d).replaceAll(
          j,
          String(listsRepeat("*", j.length).join(""))
        );
      }
      res.send(
        String(
          req.query[String("plain")] == "1"
            ? d
            : ['{"text":"', d, '"}'].join("")
        )
      );

      break;
    case "animal":
      switch (req.query[String("animal")]) {
        case "cat":
          https
            .get("https://api.thecatapi.com/v1/images/search", async (resp) => {
              let data2 = "";
              resp.on("data", async (chunk) => {
                data2 += chunk;
              });
              resp.on("end", async () => {
                let data = JSON.parse(data2);
                res.send(
                  String(
                    req.query[String("plain")] == "1"
                      ? data[0].url
                      : ['{"image":"', data[0].url, '"}'].join("")
                  )
                );
              });
            })
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        case "fish":
          res.send(
            String(
              req.query[String("plain")] == "1"
                ? listsGetRandomItem(
                    [
                      "https://media.tenor.com/R5IECfIf34YAAAAd/fish-spinning.gif",
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Ktzt82dpd6GJSO4mGDAHC5AV8hgZcgOmxA",
                    ],
                    false
                  )
                : [
                    '{"image":"',
                    listsGetRandomItem(
                      [
                        "https://media.tenor.com/R5IECfIf34YAAAAd/fish-spinning.gif",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Ktzt82dpd6GJSO4mGDAHC5AV8hgZcgOmxA",
                      ],
                      false
                    ),
                    '"}',
                  ].join("")
            )
          );

          break;
        case "dog":
          https.get("https://dog.ceo/api/breeds/image/random", async (resp) => {
              let data2 = "";
              resp.on("data", async (chunk) => {
                data2 += chunk;
              });
              resp.on("end", async () => {
                let data = JSON.parse(data2);
                res.send(
                  String(
                    req.query[String("plain")] == "1"
                      ? data.message
                      : ['{"image":"', data.message, '"}'].join("")
                  )
                );
              });
            })
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        case "fox":
          https
            .get("https://randomfox.ca/floof/", async (resp) => {
              let data2 = "";
              resp.on("data", async (chunk) => {
                data2 += chunk;
              });
              resp.on("end", async () => {
                let data = JSON.parse(data2);
                res.send(
                  String(
                    req.query[String("plain")] == "1"
                      ? data.image
                      : ['{"image":"', data.image, '"}'].join("")
                  )
                );
              });
            })
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        case "duck":
          https
            .get("https://random-d.uk/api/v1/random?type=png", async (resp) => {
              let data2 = "";
              resp.on("data", async (chunk) => {
                data2 += chunk;
              });
              resp.on("end", async () => {
                let data = JSON.parse(data2);
                res.send(
                  String(
                    req.query[String("plain")] == "1"
                      ? data.url
                      : ['{"image":"', data.url, '"}'].join("")
                  )
                );
              });
            })
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        case "frog":
          res.send(
            String(
              req.query[String("plain")] == "1"
                ? [
                    "allaboutfrogs.org/funstuff/random/00",
                    mathRandomInt(10, 54),
                    ".jpg",
                  ].join("")
                : [
                    '{"image":"allaboutfrogs.org/funstuff/random/00',
                    mathRandomInt(10, 54),
                    '.jpg"}',
                  ].join("")
            )
          );

          break;
        case "panda":
          https
            .get("https://some-random-api.ml/img/panda", async (resp) => {
              let data2 = "";
              resp.on("data", async (chunk) => {
                data2 += chunk;
              });
              resp.on("end", async () => {
                let data = JSON.parse(data2);
                res.send(
                  String(
                    req.query[String("plain")] == "1"
                      ? data.link
                      : ['{"image":"', data.link, '"}'].join("")
                  )
                );
              });
            })
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        case "bunny":
          https
            .get(
              "https://api.bunnies.io/v2/loop/random/?media=gif,png",
              async (resp) => {
                let data2 = "";
                resp.on("data", async (chunk) => {
                  data2 += chunk;
                });
                resp.on("end", async () => {
                  let data = JSON.parse(data2);
                  res.send(
                    String(
                      req.query[String("plain")] == "1"
                        ? data.media.poster
                        : ['{"image":"', data.media.poster, '"}'].join("")
                    )
                  );
                });
              }
            )
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        case "koala":
          https
            .get("https://some-random-api.ml/img/koala", async (resp) => {
              let data2 = "";
              resp.on("data", async (chunk) => {
                data2 += chunk;
              });
              resp.on("end", async () => {
                let data = JSON.parse(data2);
                res.send(
                  String(
                    req.query[String("plain")] == "1"
                      ? data.link
                      : ['{"image":"', data.link, '"}'].join("")
                  )
                );
              });
            })
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        case "kangaroo":
          https
            .get("https://some-random-api.ml/animal/kangaroo", async (resp) => {
              let data2 = "";
              resp.on("data", async (chunk) => {
                data2 += chunk;
              });
              resp.on("end", async () => {
                let data = JSON.parse(data2);
                res.send(
                  String(
                    req.query[String("plain")] == "1"
                      ? data.image
                      : ['{"image":"', data.image, '"}'].join("")
                  )
                );
              });
            })
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        case "shibe":
          https
            .get("https://shibe.online/api/shibes", async (resp) => {
              let data2 = "";
              resp.on("data", async (chunk) => {
                data2 += chunk;
              });
              resp.on("end", async () => {
                let data = JSON.parse(data2);
                res.send(
                  String(
                    req.query[String("plain")] == "1"
                      ? data[0]
                      : ['{"image":"', data[0], '"}'].join("")
                  )
                );
              });
            })
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        case "raccoon":
          https
            .get("https://some-random-api.ml/animal/raccoon", async (resp) => {
              let data2 = "";
              resp.on("data", async (chunk) => {
                data2 += chunk;
              });
              resp.on("end", async () => {
                let data = JSON.parse(data2);
                res.send(
                  String(
                    req.query[String("plain")] == "1"
                      ? data.image
                      : ['{"image":"', data.image, '"}'].join("")
                  )
                );
              });
            })
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        case "bird":
          https
            .get("https://some-random-api.ml/animal/bird", async (resp) => {
              let data2 = "";
              resp.on("data", async (chunk) => {
                data2 += chunk;
              });
              resp.on("end", async () => {
                let data = JSON.parse(data2);
                res.send(
                  String(
                    req.query[String("plain")] == "1"
                      ? data.image
                      : ['{"image":"', data.image, '"}'].join("")
                  )
                );
              });
            })
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        case "red-panda":
          https
            .get(
              "https://some-random-api.ml/animal/red_panda",
              async (resp) => {
                let data2 = "";
                resp.on("data", async (chunk) => {
                  data2 += chunk;
                });
                resp.on("end", async () => {
                  let data = JSON.parse(data2);
                  res.send(
                    String(
                      req.query[String("plain")] == "1"
                        ? data.image
                        : ['{"image":"', data.image, '"}'].join("")
                    )
                  );
                });
              }
            )
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        case "whale":
          https
            .get("https://some-random-api.ml/img/whale", async (resp) => {
              let data2 = "";
              resp.on("data", async (chunk) => {
                data2 += chunk;
              });
              resp.on("end", async () => {
                let data = JSON.parse(data2);
                res.send(
                  String(
                    req.query[String("plain")] == "1"
                      ? data.link
                      : ['{"image":"', data.link, '"}'].join("")
                  )
                );
              });
            })
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        case "pikachu":
          https
            .get("https://some-random-api.ml/img/pikachu", async (resp) => {
              let data2 = "";
              resp.on("data", async (chunk) => {
                data2 += chunk;
              });
              resp.on("end", async () => {
                let data = JSON.parse(data2);
                res.send(
                  String(
                    req.query[String("plain")] == "1"
                      ? data.link
                      : ['{"image":"', data.link, '"}'].join("")
                  )
                );
              });
            })
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });

          break;
        default:
          res.send(
            String(
              "Available animals,Cat,Dog,Fox,Duck,Frog,Panda,Bunny,Koala,Kangaroo,Shibe,Raccoon,Bird,Red-panda,Whale,Pikachu"
                .split(",")
                .slice()
                .sort(listsGetSortCompare("IGNORE_CASE", 1))
                .join("\n" + "· ")
            )
          );

          break;
      }

      break;
    case "page":
      res.status(Number(200));
      res.header("Content-Type", "text/plain");
      try {
        https
          .get(req.query[String("url")], async (resp) => {
            let data2 = "";
            resp.on("data", async (chunk) => {
              data2 += chunk;
            });
            resp.on("end", async () => {
              let data = data2;
              if (
                !(!data.length || String(data).includes(String("301 Moved")))
              ) {
                res.send(
                  String(
                    req.query[String("plain")] == "1"
                      ? data
                      : ['{"content":"', data, '"}'].join("")
                  )
                );
                return;
              }
            });
          })
          .on("error", async (err) => {
            console.log("Error: " + err.message);
          });
      } catch (err) {
        if (false) {
        }
      }
      try {
        S4D_APP_PKG_axios({
          method: "get",
          url: req.query[String("url")],

          headers: {},
        })
          .then(async (response) => {
            res.send(
              String(
                req.query[String("plain")] == "1"
                  ? response.data
                  : ['{"content":"', response.data, '"}'].join("")
              )
            );
          })
          .catch(async (err) => {});
      } catch (err) {
        res.send(String('{"error":"error getting website"}'));
      }

      break;
    case "imagine":
      let craiyonImagePrompt = req.query[String("text")];
      d = S4D_makeid("10");
      let buffers = await generateImageBuffers(craiyonImagePrompt);
      fs.createWriteStream(`../neWeb/assets/api/${String(d)}.png`).write(
        buffers[0]
      );
      res.send(
        String(
          req.query[String("plain")] == "1"
            ? [
                "https://fsh-bot.frostzzone.repl.co/asset?media=api/",
                d,
                ".png",
              ].join("")
            : [
                '{"image":"',
                [
                  "https://fsh-bot.frostzzone.repl.co/asset?media=api/",
                  d,
                  ".png",
                ].join(""),
                '"}',
              ].join("")
        )
      );

      break;
    case "web-filter":
      percent = 0;
      if (!String(req.query[String("text")]).includes(String("://"))) {
        var j_list3 =
          ".com,.net,.es,.ru,.org,.info,.shop,.it,.fr,.xyz,.vk,.us,.io,.de,.name,.nl,.bz,.nu,.mx,.dev,.jp,.me,.best,.site,.online,.space,.lu,.id,.uk,.ua,.ga,.top,.biz,.jp,.cc,.cn,.pl,.eu,.vip,.in".split(
            ","
          );
        for (var j_index3 in j_list3) {
          j = j_list3[j_index3];
          if (String(req.query[String("text")]).includes(String(j))) {
            percent = (typeof percent === "number" ? percent : 0) + 5;
          }
        }
      }
      S4D_APP_PKG_axios({
        method: "get",
        url: "https://raw.githubusercontent.com/mhhakim/pihole-blocklist/master/list.txt",

        headers: {
          "content-type": "application/json",
        },
      })
        .then(async (response) => {
          ae = response.data.split("\n");
          ae.shift();
          ae.shift();
          ae.shift();
          ae.shift();
          for (var j_index4 in ae) {
            j = ae[j_index4];
            if (String(req.query[String("text")]).includes(String(j))) {
              percent = (typeof percent === "number" ? percent : 0) + 80;
            }
          }
        })
        .catch(async (err) => {
          console.log(err);
          res.send(
            String(
              req.query[String("plain")] == "1"
                ? "could not load website list"
                : '{"error":"could not load website list"}'
            )
          );
          return;
        });
      res.send(
        String(
          req.query[String("plain")] == "1"
            ? percent
            : ['{"possibility":"', percent, '"}'].join("")
        )
      );

      break;
    default:
      res.send(
        String(
          req.query[String("plain")] == "1"
            ? "404 api endpoint not found"
            : '{"error":"api endpoint not found", "code":"404"}'
        )
      );

      break;
  }
});

S4D_WEBSITECREATION_EXPRESS_app.listen(S4D_APP_WEBSITE_HOSTING_PORT);
*/
