(async () => {
  // default imports
  const events = require("events");
  const { exec } = require("child_process");
  const logs = require("discord-logs");
  const Discord = require("discord.js");
  const {
    MessageEmbed,
    MessageButton,
    MessageActionRow,
    Intents,
    Permissions,
    MessageSelectMenu,
  } = require("discord.js");
  const fs = require("fs");
  let process = require("process");
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // block imports
  const censor = require("discord-censor");
  let moment = require("moment");
  const os = require("os-utils");
  let URL = require("url");
  const ms = require("ms");
  let DIG = require("discord-image-generation");
  let https = require("https");
  const Captcha = require("@haileybot/captcha-generator");
  const jimp = require("jimp");
  const S4D_APP_PKG_axios = require("axios");
  const S4D_APP_REDDIT_musakui = require("musakui");
  const S4D_WEBSITECREATION_EXPRESS = require("express");
  const S4D_WEBSITECREATION_bodyParser = require("body-parser");
  const S4D_WEBSITECREATION_cors = require("cors");
  var S4D_WEBSITECREATION_path = require("path");
  const S4D_WEBSITECREATION_EXPRESS_app = S4D_WEBSITECREATION_EXPRESS();
  const Database = require("easy-json-database");
  const SnakeGame = require("snakecord");
  const { TicTacToe } = require("discord-gamecord");

  // define s4d components (pretty sure 90% of these arnt even used/required)
  let s4d = {
    Discord,
    fire: null,
    joiningMember: null,
    reply: null,
    player: null,
    manager: null,
    Inviter: null,
    message: null,
    notifer: null,
    checkMessageExists() {
      if (!s4d.client)
        throw new Error(
          "You cannot perform message operations without a Discord.js client"
        );
      if (!s4d.client.readyTimestamp)
        throw new Error(
          "You cannot perform message operations while the bot is not connected to the Discord API"
        );
    },
  };

  // create a new discord client
  s4d.client = new s4d.Discord.Client({
    intents: [
      Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0),
    ],
    partials: ["REACTION", "CHANNEL"],
  });

  // when the bot is connected say so
  s4d.client.on("ready", () => {
    console.log(s4d.client.user.username + " is alive!");
  });

  // upon error print "Error!" and the error
  process.on("uncaughtException", function (err) {
    console.log("Error!");
    console.log(err);
  });

  // give the new client to discord-logs
  logs(s4d.client);

  // pre blockly code
  function S4D_makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < Number(length); i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // blockly code
  var member,
    input,
    to,
    server,
    code,
    image,
    text,
    extra,
    time,
    condition,
    url,
    type,
    s4dmessage,
    a,
    user,
    arguments2,
    command,
    d,
    percent,
    b,
    j,
    extension_ping,
    ae,
    platform,
    dd,
    c,
    status2,
    bb,
    g,
    images,
    aa,
    bbb,
    item,
    evile;

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

  // Describe this function...
  function get_presences(member) {
    let presenceList = [];
    try {
      let presences = member.presence.clientStatus;
      Object.keys(presences).forEach((key) => {
        let thing = [];
        thing.push(key);
        thing.push(presences[String(key)]);
        presenceList.push(thing);
      });
    } catch (err) {
      /*
            if user has no presences,
        return the empty list
            */
    }
    return presenceList;
  }

  // Describe this function...
  function translate(input, to) {
    S4D_APP_PKG_axios({
      method: "get",
      url: ["https://api.popcat.xyz/translate?to=", to, "&text=", input].join(
        ""
      ),

      headers: {
        "content-type": "application/json",
      },
    })
      .then(async (response) => {
        if (true) {
          return response.data.translated;
        }
      })
      .catch(async (err) => {
        console.log(err);
      });
    return "error";
  }

  // Describe this function...
  function server_language(server) {
    return server_config.get(String(server.id)).split(",")[0];
  }

  // Describe this function...
  function decode(code) {
    a =
      eval(`let alpha = [" ", " ", " ", " ", " ", " ", " ", " ", " ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "_"];
          let encoded = code;
          let i = 0;
          let output = [];
          let decoded = '';
          let temp = "a";
          while (!(temp == '00')) {
              temp = encoded.charAt(i) + encoded.charAt(i + 1);
              i = i + 2
              if (!(alpha[temp - 1] == undefined)) {
                  decoded = decoded + alpha[temp - 1];
              }
          };
          output[0] = decoded
          decoded = '';
          temp = "a";
          while (!(temp == '00')) {
              temp = encoded.charAt(i) + encoded.charAt(i + 1);
              i = i + 2
              if (!(alpha[temp - 1] == undefined)) {
                  decoded = decoded + alpha[temp - 1];
              }
          };
          output[1] = decoded
          rety = output;`);
    return [a[0], a[1]];
  }

  function textToTitleCase(str) {
    return str.replace(/\S+/g, function (txt) {
      return txt[0].toUpperCase() + txt.substring(1).toLowerCase();
    });
  }

  // Describe this function...
  function animal_thoighgh(image) {
    var animal = new Discord.MessageEmbed();
    animal.setTimestamp(new Date());
    animal.setFooter({
      text: String("V" + String(version)),
      iconURL: String(),
    });
    animal.setColor("#33ffff");
    animal.setTitle(String(textToTitleCase(arguments2.join(" "))));
    animal.setURL(String(image));
    animal.setImage(String(image));

    return animal;
  }

  // Describe this function...
  function bad_words() {
    return fs.readFileSync("text/bad-words.txt", "utf8").split(",");
  }

  function colourRandom() {
    var num = Math.floor(Math.random() * Math.pow(2, 24));
    return "#" + ("00000" + num.toString(16)).substr(-6);
  }

  // Describe this function...
  function textu(text, input, extra) {
    return [text, input, extra, "\n"].join("");
  }

  // Describe this function...
  function time_gud(time) {
    return [
      Math.floor(time / 60) > 59
        ? Math.floor(time / 3600) > 23
          ? false
            ? null
            : [
                Math.floor(time / 86400),
                " days ",
                Math.floor(time / 3600) % 24,
                " hours ",
              ].join("")
          : String(Math.floor(time / 3600) % 24) + " hours "
        : "",
      Math.floor(time / 60) % 60,
      " minutes ",
      time % 60,
      " seconds",
    ].join("");
  }

  // Describe this function...
  function true_false(text, condition) {
    return [text, condition ? "True" : "False", "\n"].join("");
  }

  // Describe this function...
  function get_imag(url, type, s4dmessage) {
    https
      .get(url, async (resp) => {
        let data2 = "";
        resp.on("data", async (chunk) => {
          data2 += chunk;
        });
        resp.on("end", async () => {
          let data = JSON.parse(data2);
          eval(
            `s4dmessage.channel.send({embeds: [(animal_thoighgh(${type}))]});`
          );
        });
      })
      .on("error", async (err) => {
        console.log("Error: " + err.message);
      });
  }

  await s4d.client.login(process.env[String("token")]).catch((e) => {
    const tokenInvalid = true;
    const tokenError = e;
    if (e.toString().toLowerCase().includes("token")) {
      throw new Error("An invalid bot token was provided!");
    } else {
      console.log(e);
      throw new Error(
        "Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them."
      );
    }
  });

  const version = "0.4.1";

  const craiyon = require("craiyon");

  const craiyonClient = new craiyon.Client();

  S4D_WEBSITECREATION_EXPRESS_app.set("trust proxy", true);

  const fsh_count = new Database("./databases/fsh_count.json");
  const user_fsh = new Database("./databases/user_fsh.json");
  const user_inventory = new Database("./databases/user_inventory.json");
  const user_badges = new Database("./databases/user_badges.json");
  const bank_fsh = new Database("./databases/bank_fsh.json");
  const server_config = new Database("./databases/server_config.json");
  const server_polls = new Database("./databases/server_polls.json");
  const cooldown = new Database("./databases/cooldown.json");
  /* IMPORTED - S4D Website Hosting Dependencies */
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
      S4D_WEBSITECREATION_path.join(__dirname, String("../web/page/main.html"))
    );
  });
  S4D_WEBSITECREATION_EXPRESS_app.get("/auth", async function (req, res) {
    res.sendFile(
      S4D_WEBSITECREATION_path.join(__dirname, String("../web/page/main.html"))
    );
  });
  S4D_WEBSITECREATION_EXPRESS_app.get("/robots.txt", async function (req, res) {
    res.sendFile(
      S4D_WEBSITECREATION_path.join(__dirname, String("../web/page/robots.txt"))
    );
  });
  S4D_WEBSITECREATION_EXPRESS_app.get("/invite", async function (req, res) {
    res.sendFile(
      S4D_WEBSITECREATION_path.join(
        __dirname,
        String("../web/page/invite.html")
      )
    );
  });
  S4D_WEBSITECREATION_EXPRESS_app.get("/tos", async function (req, res) {
    res.sendFile(
      S4D_WEBSITECREATION_path.join(__dirname, String("../web/page/tos.html"))
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
            ("web/assets/" + String(req.query[String("media")])).lastIndexOf(
              "."
            )
          ) == ".png" ||
          ("web/assets/" + String(req.query[String("media")])).substring(
            ("web/assets/" + String(req.query[String("media")])).lastIndexOf(
              "."
            )
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
            String("../web/assets/" + String(req.query[String("media")]))
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
        fs.readFileSync(
          "web/css/" + String(req.query[String("css")]),
          "utf8"
        ) == null
      ) {
        res.send(String("file not found"));
      } else {
        res.header("Content-Type", "text/css");
        res.sendFile(
          S4D_WEBSITECREATION_path.join(
            __dirname,
            String("../web/css/" + String(req.query[String("css")]))
          )
        );
      }
    } else {
      res.send(String("file not found"));
    }
  });
  S4D_WEBSITECREATION_EXPRESS_app.get("/api", async function (req, res) {
    res.sendFile(
      S4D_WEBSITECREATION_path.join(__dirname, String("../web/page/api.html"))
    );
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
          fs.readFileSync("./databases/fsh_count.json")
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
        /*
                Depracated
                */
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
        var j_list = bad_words();
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
              ? String(!d)
              : ['{"dirty":"', !d, '"}'].join("")
          )
        );

        break;
      case "censor":
        d = req.query[String("text")];
        var j_list2 = bad_words();
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
              .get(
                "https://api.thecatapi.com/v1/images/search",
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
                          ? data[0].url
                          : ['{"image":"', data[0].url, '"}'].join("")
                      )
                    );
                  });
                }
              )
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
            https
              .get("https://dog.ceo/api/breeds/image/random", async (resp) => {
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
              .get(
                "https://random-d.uk/api/v1/random?type=png",
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
                          ? data.url
                          : ['{"image":"', data.url, '"}'].join("")
                      )
                    );
                  });
                }
              )
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
              .get(
                "https://some-random-api.ml/animal/kangaroo",
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
              .get(
                "https://some-random-api.ml/animal/raccoon",
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
        fs.createWriteStream(`../web/assets/api/${String(d)}.png`).write(
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
                percent = (typeof percent === "number" ? percent : 0) + 1;
              }
            }
            res.send(
              String(
                req.query[String("plain")] == "1"
                  ? percent
                  : ['{"text":"', percent, '"}'].join("")
              )
            );
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
  S4D_WEBSITECREATION_EXPRESS_app.use(function (req, res) {
    res.sendFile(
      S4D_WEBSITECREATION_path.join(__dirname, String("../web/page/error.html"))
    );
  });

  S4D_APP_WEBSITE_HOSTING_PORT = 4077;
  S4D_WEBSITECREATION_EXPRESS_app.listen(S4D_APP_WEBSITE_HOSTING_PORT);

  /*
          Function to generate list of image buffers.
      thx frostzzone
          */
  async function generateImageBuffers(InputPrompt) {
    let generatedResults = await craiyonClient.generate({
      prompt: InputPrompt,
    });
    let buffers = generatedResults.asBuffers();
    return buffers;
  }

  s4d.client.on("ready", async () => {
    s4d.client.application?.commands.create({
      name: "amount",
      type: 2,
    });
    s4d.client.application?.commands.create({
      name: "rob",
      type: 2,
    });
    s4d.client.application?.commands.create({
      name: "user",
      type: 2,
    });
    while (s4d.client && s4d.client.token) {
      await delay(50);
      s4d.client.user.setActivity(
        ["fsh - ", s4d.client.ws.ping, "ms"].join(""),
        {
          type: "STREAMING",
          url: "https://www.youtube.com/watch?v=jpO2zd9zbng",
        }
      );
      await delay(Number(10) * 1000);

      if (false) {
        console.log("ran");
      }
    }
  });

  s4d.client.on("guildCreate", async (s4dguild) => {
    if (!server_config.has(String(s4dguild.id))) {
      server_config.set(
        String(s4dguild.id),
        String(
          "en,es,ru,uk,nl,lt,de"
            .split(",")
            .includes(
              s4d.client.guilds.cache
                .get(s4dguild.id)
                .preferredLocale.slice(0, 2)
            )
            ? s4d.client.guilds.cache
                .get(s4dguild.id)
                .preferredLocale.slice(0, 2)
            : "en"
        ) + ",true"
      );
    }
  });

  s4d.client.on("interactionCreate", async (interaction) => {
    switch (interaction.commandName) {
      case "amount":
        if (interaction.targetUser == s4d.client.user) {
          await interaction.reply({
            ephemeral: false,
            content: "Fsh fsh fsh fsh fsh fsh",
            components: [],
          });
        } else {
          if (!fsh_count.has(String(interaction.targetUser.id))) {
            fsh_count.set(String(interaction.targetUser.id), 0);
          }
          await interaction.reply({
            ephemeral: false,
            content: [
              interaction.targetUser.username,
              " has said fsh ",
              fsh_count.get(String(interaction.targetUser.id)),
              " times",
            ].join(""),
            components: [],
          });
        }

        break;
      case "rob":
        if (
          server_config
            .get(String(interaction.guild.id))
            .split(",")[1]
            .toLowerCase() == "true"
        ) {
          if (interaction.member != interaction.targetMember) {
            if (
              interaction.targetMember ==
              interaction.guild.members.cache.find(
                (m) => m.id === s4d.client.user.id
              )
            ) {
              await interaction.reply({
                ephemeral: false,
                content: "you can not rob me",
                components: [],
              });
              return;
            }
            if (!fsh_count.has(String(interaction.targetMember.id))) {
              fsh_count.set(String(interaction.targetMember.id), 0);
              await interaction.reply({
                ephemeral: false,
                content: "User doesn't have fsh/doesn't exist",
                components: [],
              });
              return;
            }
            if (fsh_count.get(String(interaction.targetMember.id)) < 5) {
              await interaction.reply({
                ephemeral: false,
                content: "User doesn't have fsh/doesn't exist",
                components: [],
              });
              return;
            }
            if (cooldown.has(String(String(interaction.member.id) + "-rob"))) {
              if (
                cooldown.get(String(String(interaction.member.id) + "-rob")) +
                  3600 >
                Math.floor(new Date().getTime() / 1000)
              ) {
                await interaction.reply({
                  ephemeral: false,
                  content: [
                    "you are on cooldown. you will be able to rob again in <t:",
                    cooldown.get(
                      String(String(interaction.member.id) + "-rob")
                    ) + 3600,
                    ":R>",
                  ].join(""),
                  components: [],
                });
                return;
              }
            }
            if (mathRandomInt(1, 3) == 2) {
              b = mathRandomInt(10, 75);
              if (b > fsh_count.get(String(interaction.targetMember.id))) {
                await interaction.reply({
                  ephemeral: false,
                  content: [
                    "Rob successful",
                    "\n",
                    [
                      "You robbed `",
                      fsh_count.get(String(interaction.targetMember.id)),
                      "` fsh",
                    ].join(""),
                  ].join(""),
                  components: [],
                });
                fsh_count.add(
                  String(interaction.member.id),
                  parseInt(fsh_count.get(String(interaction.targetMember.id)))
                );
                fsh_count.set(String(interaction.targetMember.id), 0);
              } else {
                await interaction.reply({
                  ephemeral: false,
                  content: [
                    "Rob successful",
                    "\n",
                    ["You robbed `", b, "` fsh"].join(""),
                  ].join(""),
                  components: [],
                });
                fsh_count.add(String(interaction.member.id), parseInt(b));
                fsh_count.subtract(
                  String(interaction.targetMember.id),
                  parseInt(b)
                );
              }
            } else {
              if (mathRandomInt(1, 2) == 2) {
                await interaction.reply({
                  ephemeral: false,
                  content: "Rob failed but you were not found",
                  components: [],
                });
              } else {
                b = mathRandomInt(10, 75);
                if (b > fsh_count.get(String(interaction.member.id))) {
                  await interaction.reply({
                    ephemeral: false,
                    content: [
                      "Rob failed and you got caught by police",
                      "\n",
                      [
                        "You lost",
                        fsh_count.get(String(interaction.member.id)),
                        "` fsh",
                      ].join(""),
                    ].join(""),
                    components: [],
                  });
                  fsh_count.set(String(interaction.member.id), 0);
                } else {
                  await interaction.reply({
                    ephemeral: false,
                    content: [
                      "Rob failed and you got caught by police",
                      "\n",
                      ["You lost `", b, "` fsh"].join(""),
                    ].join(""),
                    components: [],
                  });
                  fsh_count.subtract(
                    String(interaction.member.id),
                    parseInt(b)
                  );
                }
              }
            }
            cooldown.set(
              String(String(interaction.member.id) + "-rob"),
              Math.floor(new Date().getTime() / 1000)
            );
          } else {
            await interaction.reply({
              ephemeral: false,
              content: "you can't rob yourself",
              components: [],
            });
          }
        } else {
          await interaction.reply({
            ephemeral: false,
            content: "server has disabled robing",
            components: [],
          });
        }

        break;
      case "user":
        user = interaction.targetMember;
        var user_info = new Discord.MessageEmbed();
        user_info.setThumbnail(
          String(
            user.displayAvatarURL({
              format: "png",
            })
          )
        );
        user_info.setTitle(String("User info"));
        user_info.setURL(String());
        user_info.setColor(user.displayHexColor);
        user_info.setFooter({
          text: String("V" + String(version)),
          iconURL: String(),
        });
        user_info.setDescription(
          String(
            [
              "> Username: ",
              [user.user.username, "#", user.user.discriminator].join(""),
              "\n",
              "> Nickname: ",
              user.nickname == null ? user.user.username : user.nickname,
              "\n",
              "> Id: ",
              user.id,
              "\n",
              "> Joined server: <t:",
              Math.floor(Number(user.joinedTimestamp) / 1000),
              ":R>",
              "\n",
              "> Joined discord: <t:",
              Math.floor(
                Number(moment(user.user.createdAt).format("x")) / 1000
              ),
              ":R>",
            ].join("")
          )
        );
        user_info.setTimestamp(new Date());
        user_info.addField(
          String("Conditionals"),
          String(
            [
              "",
              true_false("> Has used fsh: ", fsh_count.has(String(user.id))),
              true_false("> Is bot: ", user.bot),
              true_false("> Is timed out: ", user.isCommunicationDisabled()),
              true_false(
                "> Has administrator: ",
                user.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
              ),
            ].join("")
          ),
          false
        );
        if (!get_presences(user).length) {
          user_info.addField(
            String("Presences"),
            String("User is offline"),
            true
          );
        } else {
          d = "";
          var j_list4 = get_presences(user);
          for (var j_index5 in j_list4) {
            j = j_list4[j_index5];
            platform = j[0];
            status2 = j[1];
            d += String(
              [
                "<:pc_online:1083547549291532338>",
                "<:pc_idle:1083548103912730624>",
                "<:pc_dnd:1083547848903229440>",
                "<:web_online:1083549077687513128>",
                "<:web_idle:1083548658328416256>",
                "<:web_dnd:1083548859378172016>",
                "<:mobile_online:1083543456699400273>",
                "<:mobile_idle:1083543403419160617>",
                "<:mobile_dnd:1083543341611876422>",
              ][
                [
                  "desktop-online",
                  "desktop-idle",
                  "desktop-dnd",
                  "web-online",
                  "web-idle",
                  "web-dnd",
                  "mobile-online",
                  "mobile-idle",
                  "mobile-dnd",
                ].indexOf([platform, "-", status2].join("")) +
                  1 -
                  1
              ]
            );
          }
          user_info.addField(String("Presences"), String(d), true);
        }
        d = [];
        user.roles.cache.forEach(async (member_role) => {
          d.push(member_role.rawPosition);
        });
        dd = "";
        var j_list5 = d.slice().sort(listsGetSortCompare("NUMERIC", -1));
        for (var j_index6 in j_list5) {
          j = j_list5[j_index6];
          interaction.guild.roles.cache.forEach(async (ro) => {
            if (ro.rawPosition == j) {
              dd = [dd, "<@&", ro.id, "> "].join("");
            }
          });
        }
        user_info.addField(
          String(["Roles (", user._roles.length, ")"].join("")),
          String(
            [
              "Highest role: <@&",
              user.roles.highest.id,
              ">",
              "\n",
              "Color: ",
              user.displayHexColor,
              "\n",
              dd,
            ].join("")
          ),
          false
        );

        await interaction.reply({
          embeds: [user_info],
        });

        break;
    }
  });

  s4d.client.on("messageCreate", async (s4dmessage) => {
    if (s4dmessage.webhookId != null) {
      if (String(s4dmessage.content.toLowerCase()).includes(String("fsh"))) {
        if (s4dmessage.channel.parentId != "1095063470082363493") {
          s4dmessage.channel.send({
            content: String("fsh"),
          });
        }
      }
    }
  });

  s4d.client.on("messageCreate", async (s4dmessage) => {
    if (s4dmessage.author.bot) {
      return;
    }
    if (
      String(s4dmessage.content.toLowerCase()).includes(String("fsh")) &&
      !(s4dmessage.content.toLowerCase() || "").startsWith("fsh!" || "")
    ) {
      s4dmessage.channel.send({
        content: String("fsh"),
      });
      if (fsh_count.has(String(s4dmessage.author.id))) {
        fsh_count.add(String(s4dmessage.author.id), parseInt(1));
        s4d.client.guilds.cache.forEach(async (s) => {
          if (String(s.ownerId) == s4dmessage.author.id) {
            fsh_count.add(String(s4dmessage.author.id), parseInt(1));
            return;
          }
        });
      } else {
        fsh_count.set(String(s4dmessage.author.id), 1);
      }
      return;
    }
    if (
      s4dmessage.mentions.users != null &&
      s4dmessage.mentions.users.size > 0
    ) {
      if (s4dmessage.mentions.members.first().id == "1068572316986003466") {
        if (!(s4dmessage.type == "REPLY")) {
          s4dmessage.channel.send({
            content: String("fsh"),
          });
          s4dmessage.channel.send({
            content: String("*( my prefix is fsh! )*"),
          });
          if (fsh_count.has(String(s4dmessage.author.id))) {
            fsh_count.add(String(s4dmessage.author.id), parseInt(1));
            s4d.client.guilds.cache.forEach(async (s) => {
              if (String(s.ownerId) == s4dmessage.author.id) {
                fsh_count.add(String(s4dmessage.author.id), parseInt(1));
                return;
              }
            });
          } else {
            fsh_count.set(String(s4dmessage.author.id), 1);
          }
        }
        return;
      }
    }
    arguments2 = s4dmessage.content.toLowerCase().split(" ");
    command = arguments2.shift();
    if ((s4dmessage.content.toLowerCase() || "").startsWith("fsh!" || "")) {
      command = String(command).replaceAll("fsh!", String(""));
    } else {
      return;
    }
    if (!fsh_count.has(String(s4dmessage.author.id))) {
      fsh_count.set(String(s4dmessage.author.id), 0);
    }
    switch (command) {
      /*
            main
            */
      case "help":
        if (!arguments2.length) {
          var help = new Discord.MessageEmbed();
          help.setTitle(String("Bot help"));
          help.setURL(String());
          help.setFooter({
            text: String("V" + String(version)),
            iconURL: String(),
          });
          help.setTimestamp(new Date());
          help.setColor(colourRandom());
          help.setDescription(
            String(`Made by \`frostzzone#4486 and inventionpro#6814\`
              (optional)  -  <obligatory>  -  {type}`)
          );

          const help_menu = eval(`(new MessageActionRow()
                        .addComponents(
                            new MessageSelectMenu()
                            .setCustomId('help_menu')
                            .setPlaceholder('Select category')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setDisabled(false)
    
    
                            .addOptions({
                                value: 'main',
                                label: 'Main',
                                description: 'Main commands',
                                default: false,
                            }, {
                                value: 'economy',
                                label: 'Economy',
                                description: 'Economy commands',
                                default: false,
                            }, {
                                value: 'fun',
                                label: 'Fun',
                                description: 'Fun commands',
                                default: false,
                            }, {
                                value: 'utility',
                                label: 'Utility',
                                description: 'Utility commands',
                                default: false,
                            }, {
                                value: 'admin',
                                label: 'Admin only',
                                description: 'Admin only commands',
                                default: false,
                            }, {
                                value: 'context',
                                label: 'Context menus',
                                description: 'Context menus',
                                default: false,
                            }, ))
                    )`);
          const invite_h = new MessageButton()
            .setLabel("Invite")
            .setStyle("LINK")
            .setURL("https://fsh-bot.frostzzone.repl.co/invite");
          const website_h = new MessageButton()
            .setLabel("Website")
            .setStyle("LINK")
            .setURL("https://fsh-bot.frostzzone.repl.co");
          const api_h = new MessageButton()
            .setLabel("Api")
            .setStyle("LINK")
            .setURL("https://fsh-bot.frostzzone.repl.co/api");
          const server = new MessageButton()
            .setLabel("Server")
            .setStyle("LINK")
            .setURL("https://discord.gg/SXcXZN4tkM");
          const buttons = new MessageActionRow().addComponents(
            website_h,
            invite_h,
            api_h,
            server
          );
          s4dmessage.channel
            .send({
              embeds: [help],
              components: [help_menu, buttons],
            })
            .then(async (m) => {
              let collector = m.createMessageComponentCollector({
                filter: (i) => i.user.id === s4dmessage.author.id,
                time: 60000,
              });
              collector.on("collect", async (i) => {
                var help = new Discord.MessageEmbed();
                help.setFooter({
                  text: String("V" + String(version)),
                  iconURL: String(),
                });
                help.setTimestamp(new Date());
                help.setColor("#c0c0c0");
                help.setTitle(String("Bot help " + String(i.values[0])));
                help.setURL(String());
                switch (i.values[0]) {
                  case "main":
                    help.setDescription(
                      String(`> fsh!help (command) - This thing
                      > fsh!info - Gives info about the bot
                      > fsh!ping - Instead of giving all data only ping
                      > fsh!credits - Gives fsh credits
                      > fsh!suggest - Suggest features or report bugs`)
                    );

                    break;
                  case "economy":
                    help.setDescription(
                      String(`> fsh!amount (member) - Tells you how much fsh someone has said
                      > fsh!give/gift <user> <amount> - Gives fsh to people
                      > fsh!rob <user> - Tries to rob someone
                      > fsh!daily - Gives daily amount of fsh
                      > fsh!weekly - Gives weekly amount of fsh
                      > fsh!leaderboard/lb/top - The fsh leaderboard`)
                    );

                    break;
                  case "fun":
                    help.setDescription(
                      String(`> fsh!look/link - Look better at fsh and see record
                      > fsh!eat - Try to eat the fsh
                      > fsh!animal (animal) - Get animal image
                      > fsh!gcomplete - Let google finish a sentence
                      > fsh!imagine <prompt> - Let crAIyon make an image from your promt
                      > fsh!captcha - Shows captcha that you can solve
                      > fsh!no-u (user) - no u
                      > fsh!floppa - Sends floppa
                      > fsh!lemon <member> - Lemons a user
                      > fsh!meme - Sends random fsh meme`)
                    );

                    break;
                  case "utility":
                    help.setDescription(
                      String(`> fsh!user (user) - Gives user info
                      > fsh!channel (channel) - Gives channel info
                      > fsh!server - Gives server info
                      > fsh!role <role> - Gives role info
                      > fsh!qr <text> - Creates qr with the text
                      > fsh!random <thing> (amount) - Gives random thing
                      > fsh!translate <language code> <text> - Translates text
                      > fsh!image <edit> - Edit a image`)
                    );

                    break;
                  case "music":
                    help.setDescription(String("No music yet"));

                    break;
                  case "admin":
                    help.setDescription(
                      String(
                        "> fsh!config (thing) - Config bot (leave empty for help)"
                      )
                    );

                    break;
                  case "context":
                    help.setDescription(
                      String(`> amount {user} - Gives the amount of fsh someone has
                      > rob {user} - Robs user
                      > user {user} - User info`)
                    );

                    break;
                }

                i.update({
                  embeds: [help],
                });
              });
            });
        } else {
          var help = new Discord.MessageEmbed();
          help.setTitle(String("Bot help"));
          help.setURL(String());
          help.setFooter({
            text: String("V" + String(version)),
            iconURL: String(),
          });
          help.setTimestamp(new Date());
          help.setColor("#3366ff");
          switch (arguments2[0]) {
            case "help":
              help.setDescription(
                String(`fsh!help (command)
                  A command that helps the user
                  (command)
                  Empty show list of commands
                  Else will show info about command`)
              );

              break;
            case "info":
              help.setDescription(
                String(`fsh!info
                  Tells the user info about the bot`)
              );

              break;
            case "amount":
              help.setDescription(
                String(`fsh!amount (member)
                  Tells you how many times someone has said fsh
                  (member)
                  Empty - Tell your fsh amount
                  Else - Amount of fsh of mentioned member`)
              );

              break;
            case "leaderboard":
              help.setDescription(
                String(`fsh!leaderboard
                  Shows leaderboard of fsh usage`)
              );

              break;
            case "eat":
              help.setDescription(
                String(`fsh!eat
                  How dare you`)
              );

              break;
            case "look":
            case "link":
              help.setDescription(
                String(`fsh!look / fsh!link
                  Get a link to look at fsh and says what is the record`)
              );

              break;
            case "animal":
              help.setDescription(
                String(`fsh!animal (animal)
                  Responds with animal picture
                  (animal)
                  Empty - List of animals
                  Else - Image of animal`)
              );

              break;
            case "credits":
              help.setDescription(
                String(`fsh!credits
                  Responds with random fish`)
              );

              break;
            case "ping":
              help.setDescription(
                String(`fsh!ping
                  Instead of giving all data like info only gives ping`)
              );

              break;
            case "suggest":
              help.setDescription(
                String(`fsh!suggest
                  Shows form where you can suggest features or report bugs`)
              );

              break;
            case "config":
              help.setDescription(
                String(`fsh!config (thing) (value)
                  Configs something without dashboard
                  (leave empty things for help)`)
              );

              break;
            case "gift":
            case "give":
              help.setDescription(
                String(`> fsh!give <user> <amount>
                  Gives fsh to people`)
              );

              break;
            case "rob":
              help.setDescription(
                String(`fsh!rob <user>
                  Try to rob someone`)
              );

              break;
            case "daily":
              help.setDescription(
                String(`fsh!daily
                  Gives you fsh by using daily daily`)
              );

              break;
            case "eval":
              help.setDescription(
                String(`:)
                  developer only`)
              );

              break;
            default:
              help.setColor("#ff0000");
              help.setDescription(
                String(`No command was found
                  Make sure spelling was correct`)
              );

              break;
          }

          s4dmessage.channel.send({
            embeds: [help],
          });
        }

        break;
      case "info":
        os.cpuUsage(async function (v) {
          var obj = v * 100;
          var info = new Discord.MessageEmbed();
          info.setTitle(String("Bot info"));
          info.setURL(String());
          info.setFooter({
            text: String("V" + String(version)),
            iconURL: String(),
          });
          info.setTimestamp(new Date());
          info.setColor("#999999");
          info.setDescription(
            String("Created by `frostzzone#4486 and inventionpro#6814`")
          );
          var JSONdataS4D = JSON.parse(
            fs.readFileSync("databases/fsh_count.json")
          );
          info.addField(
            String("Bot"),
            String(
              [
                textu("> Ping `", s4d.client.ws.ping, "ms`"),
                textu("> Users `", s4d.client.users.cache.size, "`"),
                textu(
                  "> Members (have fshed) `",
                  Object.keys(JSONdataS4D).length,
                  "`"
                ),
                textu("> Channels `", s4d.client.channels.cache.size, "`"),
                textu("> Servers `", s4d.client.guilds.cache.size, "`"),
                "> Fsh breed `White sturgeon`",
              ].join("")
            ),
            false
          );
          info.addField(
            String("Host"),
            String(
              [
                textu(
                  "> Uptime `",
                  time_gud(Math.floor(s4d.client.uptime / 1000)),
                  "`"
                ),
                textu(
                  "> CPU usage `",
                  Math.round(Number(obj) * 100) / 100,
                  "%`"
                ),
                textu(
                  "> Memory usage `",
                  [
                    Math.round(
                      (Number(os.totalmem()) - Number(os.freemem())) / 1024
                    ),
                    "/",
                    Math.round(Number(os.freemem()) / 1024),
                  ].join(""),
                  [
                    "KB (",
                    Math.round(
                      (Math.round(
                        (Number(os.totalmem()) - Number(os.freemem())) / 1024
                      ) /
                        Math.round(Number(os.totalmem()) / 1024)) *
                        100 *
                        100
                    ) / 100,
                    "%)`",
                  ].join("")
                ),
                textu("> Operating System `", os.platform(), "`"),
              ].join("")
            ),
            false
          );

          s4dmessage.channel.send({
            embeds: [info],
          });
        });

        break;
      case "ping":
        var pingu = new Discord.MessageEmbed();
        pingu.setTitle(String("Bot ping"));
        pingu.setURL(String());
        pingu.setFooter({
          text: String("V" + String(version)),
          iconURL: String(),
        });
        pingu.setTimestamp(new Date());
        pingu.setColor("#999999");
        pingu.setDescription(
          String(["Fsh ping `", s4d.client.ws.ping, "ms`"].join(""))
        );
        pingu.addField(String("Extensions"), String("Loading..."), false);

        extension_ping = "";
        if (
          await (() => {
            return new Promise((resolve, reject) => {
              s4dmessage.guild.members
                .fetch(
                  s4d.client.users.cache.get(String("1030156986140074054")).id
                )
                .then(() => resolve(true))
                .catch(() => resolve(false));
            });
          })()
        ) {
          s4d.client.guilds.cache
            .get("866689038731313193")
            .channels.cache.get("1077214640754405417")
            .send({
              content: String(
                [
                  "[Fsh  |  Ping ]",
                  "\n",
                  "[ Requested by: ",
                  s4dmessage.author.username,
                  " ]",
                ].join("")
              ),
            });
          s4d.client.guilds.cache
            .get("866689038731313193")
            .channels.cache.get("1077214640754405417")
            .send(String("s4d!check"))
            .then(() => {
              s4d.client.guilds.cache
                .get("866689038731313193")
                .channels.cache.get("1077214640754405417")
                .awaitMessages({
                  filter: (m) =>
                    m.author.id ===
                    s4d.clients.cache.get(String("1030156986140074054")).id,
                  time: 0.4 * 60 * 1000,
                  max: 1,
                })
                .then(async (collected) => {
                  s4d.reply = collected.first().content;
                  s4d.message = collected.first();
                  if (!extension_ping.length) {
                    extension_ping = [
                      "`",
                      Math.abs(Number(s4d.reply) - Number(s4d.client.ws.ping)),
                      Number(s4d.reply) > Number(s4d.client.ws.ping)
                        ? "ms` less ping than "
                        : "ms` more ping than ",
                      s4d.client.users.cache.get(String("1030156986140074054"))
                        .username,
                    ].join("");
                  } else {
                    extension_ping = [
                      "\n",
                      "`",
                      Math.abs(Number(s4d.reply) - Number(s4d.client.ws.ping)),
                      Number(s4d.reply) > Number(s4d.client.ws.ping)
                        ? "ms` less ping than "
                        : "ms` more ping than ",
                      s4d.client.users.cache.get(String("1030156986140074054"))
                        .username,
                    ].join("");
                  }

                  s4d.reply = null;
                })
                .catch(async (e) => {
                  console.error(e);
                  if (!extension_ping.length) {
                    extension_ping =
                      String(
                        s4d.client.users.cache.get(
                          String("1030156986140074054")
                        ).username
                      ) + " is offline";
                  } else {
                    extension_ping = [
                      "\n",
                      s4d.client.users.cache.get(String("1030156986140074054"))
                        .username,
                      " is offline",
                    ].join("");
                  }
                });
            });
        }
        s4dmessage.channel
          .send({
            embeds: [pingu],
          })
          .then(async (s4dreply) => {
            var pingu = new Discord.MessageEmbed();
            pingu.setTitle(String("Bot ping"));
            pingu.setURL(String());
            pingu.setFooter({
              text: String("V" + String(version)),
              iconURL: String(),
            });
            pingu.setTimestamp(new Date());
            pingu.setColor("#999999");
            pingu.setDescription(
              String(["Fsh ping `", s4d.client.ws.ping, "ms`"].join(""))
            );
            if (!!extension_ping.length) {
              pingu.addField(
                String("Extensions"),
                String(extension_ping),
                false
              );
            }

            s4dreply.edit({
              embeds: [pingu],
            });
          });

        break;
      case "credits":
        var credits = new Discord.MessageEmbed();
        credits.setTitle(String("Bot credits"));
        credits.setURL(String());
        credits.setFooter({
          text: String("V" + String(version)),
          iconURL: String(),
        });
        credits.setTimestamp(new Date());
        credits.setColor("#999999");
        credits.setDescription(
          String("Created by `frostzzone#4486 and inventionpro#6814`")
        );
        credits.addField(
          String("Code / Features"),
          String(`> <@439788095483936768> [Github](https://github.com/1randomguyspecial)
            > <@767102460673916958> [Youtube](https://www.youtube.com/channel/UC8WiOgf5AGwTQ5bLJ5ya8og) [Website](https://hitbyathunder.xyz/)
            > <@860531746294726736>`),
          true
        );
        credits.addField(
          String("Website"),
          String("> <@750565290009559112>"),
          true
        );
        credits.addField(
          String("Bot integrations"),
          String(`Commands or features that are only available when certain bots are on the server
            > s4d utilities
            > s4d economy
            > [Python Bot](https://discord.com/api/oauth2/authorize?client_id=912745278187126795&permissions=1239836650583&scope=applications.commands%20bot)`),
          false
        );

        s4dmessage.channel.send({
          embeds: [credits],
        });

        break;
      case "suggest":
        s4d.client.users.cache.get(String("816691475844694047")).send({
          content: String(
            [
              s4dmessage.author.tag,
              " **suggested:**",
              "\n",
              arguments2.join(" "),
            ].join("")
          ),
        });
        s4dmessage.channel.send({
          content: String("suggestion sent"),
        });

        break;

      /*
                economy
                */
      case "amount":
        if (!arguments2.length) {
          if (!fsh_count.has(String(s4dmessage.author.id))) {
            fsh_count.set(String(s4dmessage.author.id), 0);
          }
          s4dmessage.channel.send({
            content: String(
              [
                "you have said fsh ",
                fsh_count.get(String(s4dmessage.author.id)),
                " times",
              ].join("")
            ),
          });
        } else {
          if (typeof s4dmessage.mentions.members.first() !== undefined) {
            if (s4dmessage.mentions.members.first() == s4d.client.user) {
              s4dmessage.channel.send({
                content: String("Fsh fsh fsh fsh fsh fsh"),
              });
            } else {
              if (
                !fsh_count.has(String(s4dmessage.mentions.members.first().id))
              ) {
                fsh_count.set(
                  String(s4dmessage.mentions.members.first().id),
                  0
                );
              }
              s4dmessage.channel.send({
                content: String(
                  [
                    s4dmessage.mentions.members.first().username,
                    " has said fsh ",
                    fsh_count.get(
                      String(s4dmessage.mentions.members.first().id)
                    ),
                    " times",
                  ].join("")
                ),
              });
            }
          } else {
            s4dmessage.channel.send({
              content: String("you have to mention someone"),
            });
          }
        }

        break;
      case "leaderboard":
      case "lb":
      case "top":
        var leaderboard_embed = new Discord.MessageEmbed();
        leaderboard_embed.setTitle(String("Leaderboard"));
        leaderboard_embed.setURL(String());
        leaderboard_embed.setColor("#ffcc00");
        leaderboard_embed.setTimestamp(new Date());
        leaderboard_embed.setFooter({
          text: String("V" + String(version)),
          iconURL: String(),
        });
        g = eval(`const unsortedLevels = fsh_count.all()
            const levels = unsortedLevels
                .sort((level1, level2) => level1.data - level2.data)
                .reverse()
                .map(level => (\`\${level.data} - <@\${level.key}>\`))
                .join('ç')
    
            a = levels`).split("ç");
        a = "";
        aa = 1;
        var repeat_end = Math.min(Math.max(g.length, 1), 10);
        for (var count = 0; count < repeat_end; count++) {
          a = [a, "**", aa, ".** ", g[aa - 1], "\n"].join("");
          aa = (typeof aa === "number" ? aa : 0) + 1;
        }
        leaderboard_embed.addField(String("Global"), String(a), true);
        g = eval(`var unsortedLevels = eval(\`(()=>{
                let currentServer = []
                let fshDb = fsh_count.all();
                for (let i in fshDb) {
                  let exist = typeof((s4dmessage.guild).members.cache.get(String(fshDb[i]["key"]))) || false;
                 if(typeof((s4dmessage.guild).members.cache.get(String(fshDb[i]["key"]))) != 'undefined'){
                currentServer.push(fshDb[i])
                }
                }
                  return currentServer
                })()\`);
            var levels = unsortedLevels
                .sort((level1, level2) => level1.data - level2.data)
                .reverse()
                .map(level => (\`\${level.data} - <@\${level.key}>\`))
                .join('ç')
    
            a = levels`).split("ç");
        a = "";
        aa = 1;
        var repeat_end2 = Math.min(Math.max(g.length, 1), 10);
        for (var count2 = 0; count2 < repeat_end2; count2++) {
          a = [a, "**", aa, ".** ", g[aa - 1], "\n"].join("");
          aa = (typeof aa === "number" ? aa : 0) + 1;
        }
        leaderboard_embed.addField(String("Local"), String(a), true);

        s4dmessage.channel.send({
          embeds: [leaderboard_embed],
        });

        break;
      case "gift":
      case "give":
        if (typeof s4dmessage.mentions.members.first() !== undefined) {
          if (s4dmessage.member != s4dmessage.mentions.members.first()) {
            if (!!arguments2[1].length && /\d/.test(Number(arguments2[1]))) {
              if (
                arguments2[1] <= fsh_count.get(String(s4dmessage.author.id))
              ) {
                if (
                  !fsh_count.has(String(s4dmessage.mentions.members.first().id))
                ) {
                  fsh_count.set(
                    String(s4dmessage.mentions.members.first().id),
                    0
                  );
                }
                fsh_count.subtract(
                  String(s4dmessage.author.id),
                  parseInt(arguments2[1])
                );
                fsh_count.add(
                  String(s4dmessage.mentions.members.first().id),
                  parseInt(arguments2[1])
                );
                s4dmessage.channel.send({
                  content: String(
                    ["you gave `", arguments2[1], "` fsh"].join("")
                  ),
                });
              } else {
                s4dmessage.channel.send({
                  content: String("you don't have enough fsh"),
                });
              }
            } else {
              s4dmessage.channel.send({
                content: String("you need to specify amount"),
              });
            }
          } else {
            s4dmessage.channel.send({
              content: String("you can't give yourself"),
            });
          }
        } else {
          s4dmessage.channel.send({
            content: String("you need to mention someone"),
          });
        }

        break;
      case "rob":
        if (
          server_config
            .get(String(s4dmessage.guild.id))
            .split(",")[1]
            .toLowerCase() == "true"
        ) {
          if (
            s4dmessage.mentions.users != null &&
            s4dmessage.mentions.users.size > 0
          ) {
            if (s4dmessage.member != s4dmessage.mentions.members.first()) {
              if (
                s4dmessage.mentions.members.first() ==
                s4dmessage.guild.members.cache.find(
                  (m) => m.id === s4d.client.user.id
                )
              ) {
                s4dmessage.channel.send({
                  content: String("you can not rob me"),
                });
                return;
              }
              if (
                !fsh_count.has(String(s4dmessage.mentions.members.first().id))
              ) {
                fsh_count.set(
                  String(s4dmessage.mentions.members.first().id),
                  0
                );
                s4dmessage.channel.send({
                  content: String("User doesn't have fsh/doesn't exist"),
                });
                return;
              }
              if (
                fsh_count.get(String(s4dmessage.mentions.members.first().id)) <
                5
              ) {
                s4dmessage.channel.send({
                  content: String("User doesn't have fsh/doesn't exist"),
                });
                return;
              }
              if (cooldown.has(String(String(s4dmessage.author.id) + "-rob"))) {
                if (
                  cooldown.get(String(String(s4dmessage.author.id) + "-rob")) +
                    3600 >
                  Math.floor(new Date().getTime() / 1000)
                ) {
                  s4dmessage.channel.send({
                    content: String(
                      [
                        "you are on cooldown. you will be able to rob again in <t:",
                        cooldown.get(
                          String(String(s4dmessage.author.id) + "-rob")
                        ) + 3600,
                        ":R>",
                      ].join("")
                    ),
                  });
                  return;
                }
              }
              if (mathRandomInt(1, 3) == 2) {
                s4dmessage.channel.send({
                  content: String("Rob successful"),
                });
                b = mathRandomInt(10, 75);
                if (
                  b >
                  fsh_count.get(String(s4dmessage.mentions.members.first().id))
                ) {
                  s4dmessage.channel.send({
                    content: String(
                      [
                        "You robbed `",
                        fsh_count.get(
                          String(s4dmessage.mentions.members.first().id)
                        ),
                        "` fsh",
                      ].join("")
                    ),
                  });
                  fsh_count.add(
                    String(s4dmessage.author.id),
                    parseInt(
                      fsh_count.get(
                        String(s4dmessage.mentions.members.first().id)
                      )
                    )
                  );
                  fsh_count.set(
                    String(s4dmessage.mentions.members.first().id),
                    0
                  );
                } else {
                  s4dmessage.channel.send({
                    content: String(["You robbed `", b, "` fsh"].join("")),
                  });
                  fsh_count.add(String(s4dmessage.author.id), parseInt(b));
                  fsh_count.subtract(
                    String(s4dmessage.mentions.members.first().id),
                    parseInt(b)
                  );
                }
              } else {
                if (mathRandomInt(1, 2) == 2) {
                  s4dmessage.channel.send({
                    content: String("Rob failed but you were not found"),
                  });
                } else {
                  s4dmessage.channel.send({
                    content: String("Rob failed and you got caught by police"),
                  });
                  b = mathRandomInt(10, 75);
                  if (b > fsh_count.get(String(s4dmessage.author.id))) {
                    s4dmessage.channel.send({
                      content: String(
                        [
                          "You lost",
                          fsh_count.get(String(s4dmessage.author.id)),
                          "`",
                        ].join("")
                      ),
                    });
                    fsh_count.set(String(s4dmessage.author.id), 0);
                  } else {
                    s4dmessage.channel.send({
                      content: String(["You lost `", b, "`"].join("")),
                    });
                    fsh_count.subtract(
                      String(s4dmessage.author.id),
                      parseInt(b)
                    );
                  }
                }
              }
              cooldown.set(
                String(String(s4dmessage.author.id) + "-rob"),
                Math.floor(new Date().getTime() / 1000)
              );
            } else {
              s4dmessage.channel.send({
                content: String("you can't rob yourself"),
              });
            }
          } else {
            s4dmessage.channel.send({
              content: String("you need to mention someone"),
            });
          }
        } else {
          s4dmessage.channel.send({
            content: String("server has disabled robing"),
          });
        }

        break;
      case "daily":
        if (true) {
          /*
                    This if so i can collapse
                    */
          if (cooldown.has(String(String(s4dmessage.author.id) + "-daily"))) {
            if (
              cooldown.get(String(String(s4dmessage.author.id) + "-daily")) +
                86400 >
              Math.floor(new Date().getTime() / 1000)
            ) {
              s4dmessage.channel.send({
                content: String("you are on cooldown"),
              });
              s4dmessage.channel.send({
                content: String(
                  String(
                    "you will be able to use daily again in <t:[time]:f> (<t:[time]:R>)"
                  ).replaceAll(
                    "[time]",
                    String(
                      String(
                        cooldown.get(
                          String(String(s4dmessage.author.id) + "-daily")
                        ) + 86400
                      )
                    )
                  )
                ),
              });
              return;
            }
          }
          b = mathRandomInt(20, 60);
          bb = 0;
          s4dmessage.channel.send({
            content: String("daily claimed"),
          });
          s4dmessage.channel.send({
            content: String(["you got `", b, "` fsh"].join("")),
          });
          bbb = 0;
          s4d.client.guilds.cache.forEach(async (s) => {
            if (String(s.ownerId) == s4dmessage.author.id) {
              if (bbb < 3) {
                bb = (typeof bb === "number" ? bb : 0) + mathRandomInt(2, 10);
                bbb = (typeof bbb === "number" ? bbb : 0) + 1;
              }
            }
          });
          if (bb > 0) {
            s4dmessage.channel.send({
              content: String(
                [
                  "+`",
                  bb,
                  "` fsh for every server you own that has fsh (max 3)",
                ].join("")
              ),
            });
          }
          fsh_count.add(String(s4dmessage.author.id), parseInt(b + bb));
          cooldown.set(
            String(String(s4dmessage.author.id) + "-daily"),
            Math.floor(new Date().getTime() / 1000)
          );
        }

        break;
      case "weekly":
        if (true) {
          /*
                    This if so i can collapse
                    */
          if (cooldown.has(String(String(s4dmessage.author.id) + "-weekly"))) {
            if (
              cooldown.get(String(String(s4dmessage.author.id) + "-weekly")) +
                604800 >
              Math.floor(new Date().getTime() / 1000)
            ) {
              s4dmessage.channel.send({
                content: String("you are on cooldown"),
              });
              s4dmessage.channel.send({
                content: String(
                  String(
                    "you will be able to use weekly again in <t:[time]:f> (<t:[time]:R>)"
                  ).replaceAll(
                    "[time]",
                    String(
                      String(
                        cooldown.get(
                          String(String(s4dmessage.author.id) + "-weekly")
                        ) + 604800
                      )
                    )
                  )
                ),
              });
              return;
            }
          }
          b = mathRandomInt(80, 200);
          bb = 0;
          s4dmessage.channel.send({
            content: String("weekly claimed"),
          });
          s4dmessage.channel.send({
            content: String(["you got `", b, "` fsh"].join("")),
          });
          bbb = 0;
          s4d.client.guilds.cache.forEach(async (s) => {
            if (String(s.ownerId) == s4dmessage.author.id) {
              if (bbb < 4) {
                bb = (typeof bb === "number" ? bb : 0) + mathRandomInt(4, 14);
                bbb = (typeof bbb === "number" ? bbb : 0) + 1;
              }
            }
          });
          if (bb > 0) {
            s4dmessage.channel.send({
              content: String(
                [
                  "+`",
                  bb,
                  "` fsh for every server you own that has fsh (max 5)",
                ].join("")
              ),
            });
          }
          fsh_count.add(String(s4dmessage.author.id), parseInt(b + bb));
          cooldown.set(
            String(String(s4dmessage.author.id) + "-weekly"),
            Math.floor(new Date().getTime() / 1000)
          );
        }

        break;

      /*
                fun
                */
      case "eat":
        s4dmessage.channel.send(
          listsGetRandomItem(
            [
              "https://cdn.discordapp.com/emojis/900643070155034645.gif?size=48",
              "no u",
              `fsh has noticed your attempt to eat him
          RUN!!`,
              "fsh sed",
              "no",
              "your attempt failed",
            ],
            false
          )
        );

        break;
      case "look":
      case "link":
        s4dmessage.channel.send({
          content: String(
            "you can look at me in https://scratch.mit.edu/projects/793043905/fullscreen/"
          ),
        });
        try {
          https
            .get(
              "https://clouddata.scratch.mit.edu/logs?projectid=793043905&limit=1&offset=0",
              async (resp) => {
                let data2 = "";
                resp.on("data", async (chunk) => {
                  data2 += chunk;
                });
                resp.on("end", async () => {
                  let data = JSON.parse(data2);
                  s4dmessage.channel.send({
                    content: String(
                      [
                        "record holder is ",
                        decode(data[0].value)[0],
                        " with a time of ",
                        time_gud(decode(data[0].value)[1]),
                      ].join("")
                    ),
                  });
                });
              }
            )
            .on("error", async (err) => {
              console.log("Error: " + err.message);
            });
        } catch (err) {
          console.log(err);
        }
        break;
      case "animal":
        if (!arguments2.length) {
          var animal = new Discord.MessageEmbed();
          animal.setColor("#33ffff");
          animal.setTimestamp(new Date());
          animal.setFooter({
            text: String("V" + String(version)),
            iconURL: String(),
          });
          animal.setTitle(String("Animal list"));
          animal.setURL(String());
          animal.setDescription(
            String(`· Fish
              · Cat
              · Dog
              · Fox
              · bunny
              · Duck
              · Lizard
              · Koala
              · Panda
              · kangaroo
              · Shibe
              · Raccoon
              · Bird
              · Red panda
              · Whale
              **Non-animal**
              · Pikachu
              · Neko
              · Fox girl`)
          );

          s4dmessage.channel.send({
            embeds: [animal],
          });
        } else {
          switch (arguments2.join(" ")) {
            case "duck":
              get_imag(
                "https://random-d.uk/api/v1/random?type=png",
                "data.url",
                s4dmessage
              );

              break;
            case "cat":
              get_imag(
                "https://api.thecatapi.com/v1/images/search",
                "data[0].url",
                s4dmessage
              );

              break;
            case "dog":
              get_imag(
                "https://dog.ceo/api/breeds/image/random",
                "data.message",
                s4dmessage
              );

              break;
            case "fox":
              get_imag("https://randomfox.ca/floof/", "data.image", s4dmessage);

              break;
            case "bunny":
              get_imag(
                "https://api.bunnies.io/v2/loop/random/?media=gif,png",
                "data.media.poster",
                s4dmessage
              );

              break;
            case "lizard":
              get_imag(
                "https://nekos.life/api/v2/img/lizard",
                "data.url",
                s4dmessage
              );

              break;
            case "koala":
              get_imag(
                "https://some-random-api.ml/img/koala",
                "data.link",
                s4dmessage
              );

              break;
            case "panda":
              get_imag(
                "https://some-random-api.ml/img/panda",
                "data.link",
                s4dmessage
              );

              break;
            case "kangaroo":
              get_imag(
                "https://some-random-api.ml/animal/kangaroo",
                "data.image",
                s4dmessage
              );

              break;
            case "shibe":
              get_imag(
                "https://shibe.online/api/shibes",
                "data[0]",
                s4dmessage
              );

              break;
            case "raccoon":
              get_imag(
                "https://some-random-api.ml/animal/raccoon",
                "data.image",
                s4dmessage
              );

              break;
            case "bird":
              get_imag(
                "https://some-random-api.ml/animal/bird",
                "data.image",
                s4dmessage
              );

              break;
            case "red panda":
              get_imag(
                "https://some-random-api.ml/animal/red_panda",
                "data.image",
                s4dmessage
              );

              break;
            case "whale":
              get_imag(
                "https://some-random-api.ml/img/whale",
                "data.link",
                s4dmessage
              );

              break;
            case "pikachu":
              get_imag(
                "https://some-random-api.ml/img/pikachu",
                "data.link",
                s4dmessage
              );

              break;
            case "neko":
              get_imag(
                "https://nekos.life/api/v2/img/neko",
                "data.url",
                s4dmessage
              );

              break;
            case "fox girl":
              get_imag(
                "https://nekos.life/api/v2/img/fox_girl",
                "data.url",
                s4dmessage
              );

              break;
            case "fish":
              get_imag(
                "https://fsh-bot.frostzzone.repl.co/api/fish",
                "data.image",
                s4dmessage
              );

              break;
            default:
              var animal = new Discord.MessageEmbed();
              animal.setTimestamp(new Date());
              animal.setFooter({
                text: String("V" + String(version)),
                iconURL: String(),
              });
              animal.setColor("#ff0000");
              animal.setDescription(
                String(["Animal ", arguments2.join(" "), " not found"].join(""))
              );
              animal.setTitle(String("Animal not found"));
              animal.setURL(String());

              s4dmessage.channel.send({
                embeds: [animal],
              });

              break;
          }
        }

        break;
      case "gcomplete":
        https
          .get(
            "https://suggestqueries.google.com/complete/search?client=firefox&q=" +
              String(arguments2.join(" ")),
            async (resp) => {
              let data2 = "";
              resp.on("data", async (chunk) => {
                data2 += chunk;
              });
              resp.on("end", async () => {
                let data = JSON.parse(data2);
                c = String(String(data).replaceAll("[", String("")))
                  .replaceAll("]", String(""))
                  .split(",");
                c.pop();
                c.pop();
                var gcomplete = new Discord.MessageEmbed();
                gcomplete.setTimestamp(new Date());
                gcomplete.setFooter({
                  text: String("V" + String(version)),
                  iconURL: String(),
                });
                gcomplete.setColor("#ffffcc");
                gcomplete.setTitle(
                  String(['Google complete "', c.shift(), '"'].join(""))
                );
                gcomplete.setURL(String());
                gcomplete.setDescription(
                  String(["**Results:**", "\n", c.join("\n")].join(""))
                );

                s4dmessage.channel.send({
                  embeds: [gcomplete],
                });
              });
            }
          )
          .on("error", async (err) => {
            console.log("Error: " + err.message);
          });

        break;
      case "imagine":
        var imagine = new Discord.MessageEmbed();
        imagine.setTitle(String("Generating image"));
        imagine.setURL(String());
        imagine.setColor("#ff9900");
        imagine.setDescription(
          String(`Your image is being generated
            (This may take up to 2 minutes)`)
        );
        imagine.setTimestamp(new Date());

        s4dmessage.channel
          .send({
            embeds: [imagine],
          })
          .then(async (s4dreply) => {
            let craiyonImagePrompt = arguments2.join(" ");
            images = await generateImageBuffers(craiyonImagePrompt);
            let attachment = new Discord.MessageAttachment(
              images[0],
              "generated.png"
            );
            s4dreply.delete();
            s4dmessage.reply({
              content: String("Image generated"),
            });
            s4dmessage.channel.send({
              files: [attachment],
            });
          });

        break;
      case "no-u":
        s4dmessage.delete();
        s4dmessage.channel.send({
          content: String(
            String(
              s4dmessage.mentions.users != null &&
                s4dmessage.mentions.users.size > 0
                ? ["<@", s4dmessage.mentions.members.first().id, "> "].join("")
                : ""
            ) + "no u"
          ),
        });

        break;
      case "captcha":
        let captcha = new Captcha();
        s4dmessage.reply({
          content: String("Respond to the following captcha"),
          allowedMentions: {
            repliedUser: true,
          },
        });
        s4dmessage.channel.send({
          files: [
            new Discord.MessageAttachment(captcha.JPEGStream, "captcha.jpeg"),
          ],
        });
        s4dmessage.channel.send(String("Write captcha code here")).then(() => {
          s4dmessage.channel
            .awaitMessages({
              filter: (m) => m.author.id === s4dmessage.member.id,
              time: 1 * 60 * 1000,
              max: 1,
            })
            .then(async (collected) => {
              s4d.reply = collected.first().content;
              s4d.message = collected.first();
              if (s4d.reply.toUpperCase() == captcha.value) {
                s4dmessage.reply({
                  content: String("Captcha succesful"),
                  allowedMentions: {
                    repliedUser: true,
                  },
                });
                item = mathRandomInt(2, 7);
                s4dmessage.channel.send({
                  content: String(
                    String("+% fsh").replaceAll("%", String(item))
                  ),
                });
                fsh_count.add(String(s4dmessage.author.id), parseInt(item));
              } else {
                s4dmessage.reply({
                  content: String(
                    ["Captcha failed (code was ", captcha.value, ")"].join("")
                  ),
                  allowedMentions: {
                    repliedUser: true,
                  },
                });
              }

              s4d.reply = null;
            })
            .catch(async (e) => {
              console.error(e);
              s4dmessage.reply({
                content: String("Captcha failed (no response)"),
                allowedMentions: {
                  repliedUser: true,
                },
              });
            });
        });

        break;
      case "floppa":
        S4D_APP_REDDIT_musakui("bigfloppa")
          .then(async (result) => {
            var flopp = new Discord.MessageEmbed();
            flopp.setTitle(String(result.title));
            flopp.setURL(String(result.reddit_url));
            flopp.setImage(String(result.media_url));
            flopp.setTimestamp(new Date());
            flopp.setFooter({
              text: String("V" + String(version)),
              iconURL: String(),
            });
            flopp.setColor("#cc6600");

            s4dmessage.channel.send({
              embeds: [flopp],
            });
          })
          .catch((error) => console.log(error));

        break;
      case "lemon":
        if (
          s4dmessage.mentions.users != null &&
          s4dmessage.mentions.users.size > 0
        ) {
          if (cooldown.has(String(String(s4dmessage.author.id) + "-lemon"))) {
            if (
              Math.floor(new Date().getTime() / 1000) <
              cooldown.get(String(String(s4dmessage.author.id) + "-lemon")) +
                3600
            ) {
              s4dmessage.channel.send({
                content: String(
                  String(
                    "you will be able to lemon again <t:%r%:R>"
                  ).replaceAll(
                    "%r%",
                    String(
                      String(
                        cooldown.get(
                          String(String(s4dmessage.author.id) + "-lemon")
                        ) + 3600
                      )
                    )
                  )
                ),
              });
              return;
            }
          }
          s4dmessage.mentions.members.first().send({
            content: String(
              [
                "```ansi",
                "\n",
                String("You just got lemoned by %u%").replaceAll(
                  "%u%",
                  String(s4dmessage.author.tag)
                ),
                "\n",
                "use fsh!lemon <member> to totally lemon them",
                "\n",
                "```",
              ].join("")
            ),
          });
          s4dmessage.channel.send({
            content: String("lemon sent"),
          });
          cooldown.set(
            String(String(s4dmessage.author.id) + "-lemon"),
            Math.floor(new Date().getTime() / 1000)
          );
        } else {
          s4dmessage.channel.send({
            content: String("you need to mention someone"),
          });
        }

        break;
      case "meme":
        s4dmessage.channel.send({
          content: String(
            [
              "https://fsh-bot.frostzzone.repl.co/asset?media=meme/",
              mathRandomInt(1, 16),
              ".jpg",
            ].join("")
          ),
        });

        break;

      /*
                utility
                */
      case "user":
        if (
          s4dmessage.mentions.users != null &&
          s4dmessage.mentions.users.size > 0
        ) {
          user = eval("(s4dmessage.mentions.members.first());");
        } else {
          user = eval("(s4dmessage.member)");
        }
        var user_info = new Discord.MessageEmbed();
        user_info.setThumbnail(
          String(
            user.displayAvatarURL({
              format: "png",
            })
          )
        );
        user_info.setTitle(String("User info"));
        user_info.setURL(String());
        user_info.setColor(user.displayHexColor);
        user_info.setFooter({
          text: String("V" + String(version)),
          iconURL: String(),
        });
        user_info.setDescription(
          String(
            [
              textu("> Username: ", user.user.tag, null),
              textu(
                "> Nickname: ",
                user.nickname == null ? user.user.username : user.nickname,
                null
              ),
              textu("> Id: ", user.id, null),
              textu(
                "> Joined server: <t:",
                Math.floor(Number(user.joinedTimestamp) / 1000),
                ":R>"
              ),
              textu(
                "> Joined discord: <t:",
                Math.floor(
                  Number(moment(user.user.createdAt).format("x")) / 1000
                ),
                ":R>"
              ),
            ].join("")
          )
        );
        user_info.setTimestamp(new Date());
        user_info.addField(
          String("Conditionals"),
          String(
            [
              "",
              true_false("> Has used fsh: ", fsh_count.has(String(user.id))),
              true_false("> Is bot: ", user.bot),
              true_false("> Is timed out: ", user.isCommunicationDisabled()),
              true_false(
                "> Has administrator: ",
                user.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
              ),
              true_false("> Is in voice channel: ", user.voice.channel != null),
            ].join("")
          ),
          false
        );
        if (!get_presences(user).length) {
          user_info.addField(
            String("Presences"),
            String("User is offline"),
            true
          );
        } else {
          d = "";
          var j_list6 = get_presences(user);
          for (var j_index7 in j_list6) {
            j = j_list6[j_index7];
            platform = j[0];
            status2 = j[1];
            d += String(
              [
                "<:pc_online:1083547549291532338>",
                "<:pc_idle:1083548103912730624>",
                "<:pc_dnd:1083547848903229440>",
                "<:web_online:1083549077687513128>",
                "<:web_idle:1083548658328416256>",
                "<:web_dnd:1083548859378172016>",
                "<:mobile_online:1083543456699400273>",
                "<:mobile_idle:1083543403419160617>",
                "<:mobile_dnd:1083543341611876422>",
              ][
                [
                  "desktop-online",
                  "desktop-idle",
                  "desktop-dnd",
                  "web-online",
                  "web-idle",
                  "web-dnd",
                  "mobile-online",
                  "mobile-idle",
                  "mobile-dnd",
                ].indexOf([platform, "-", status2].join("")) +
                  1 -
                  1
              ]
            );
          }
          user_info.addField(String("Presences"), String(d), true);
        }
        d = [];
        user.roles.cache.forEach(async (member_role) => {
          d.push(member_role.rawPosition);
        });
        dd = "";
        var j_list7 = d.slice().sort(listsGetSortCompare("NUMERIC", -1));
        for (var j_index8 in j_list7) {
          j = j_list7[j_index8];
          s4dmessage.guild.roles.cache.forEach(async (ro) => {
            if (ro.rawPosition == j) {
              dd = [dd, "<@&", ro.id, "> "].join("");
            }
          });
        }
        user_info.addField(
          String(["Roles (", user._roles.length, ")"].join("")),
          String(
            [
              "Highest role: <@&",
              user.roles.highest.id,
              ">",
              "\n",
              "Color: ",
              user.displayHexColor,
              "\n",
              dd,
            ].join("")
          ),
          false
        );

        s4dmessage.channel.send({
          embeds: [user_info],
        });

        break;
      case "channel":
        if (
          s4dmessage.mentions.channels != null &&
          s4dmessage.mentions.channels.size > 0
        ) {
          user = s4dmessage.mentions.channels.first();
        } else {
          user = s4dmessage.channel;
        }
        var channel_info = new Discord.MessageEmbed();
        channel_info.setTitle(String("Channel info"));
        channel_info.setURL(String());
        channel_info.setDescription(
          String(
            [
              "> Name: ",
              user.name,
              "\n",
              "> Id: ",
              user.id,
              "\n",
              "> Type: ",
              eval("user.type"),
              "\n",
              "> Position: ",
              user.position + 1,
              "\n",
              "> Slowmode: ",
              user.rateLimitPerUser,
              "\n",
              "> NSFW: ",
              user.nsfw ? "True" : "False",
              "\n",
              "> Topic: ",
              user.topic,
            ].join("")
          )
        );
        channel_info.addField(
          String("Channel category"),
          String(
            [
              "> Name: ",
              s4dmessage.guild.channels.cache.get(user.parentId).name,
              "\n",
              "> Id: ",
              s4dmessage.guild.channels.cache.get(user.parentId).id,
              "\n",
              "> Position: ",
              s4dmessage.guild.channels.cache.get(user.parentId).position + 1,
            ].join("")
          ),
          false
        );
        channel_info.setColor("#ffcc66");
        channel_info.setTimestamp(new Date());
        channel_info.setFooter({
          text: String("V" + String(version)),
          iconURL: String(),
        });

        s4dmessage.channel.send({
          embeds: [channel_info],
        });

        break;
      case "server":
        var server_info = new Discord.MessageEmbed();
        if (
          s4dmessage.guild.iconURL({
            dynamic: true,
          }) == null
        ) {
          server_info.setThumbnail(
            String(
              "https://via.placeholder.com/100x100.png/DDDDDD/000000?text=N/A"
            )
          );
        } else {
          server_info.setThumbnail(
            String(
              s4dmessage.guild.iconURL({
                dynamic: true,
              })
            )
          );
        }
        server_info.setTitle(String("Server info"));
        server_info.setURL(String());
        server_info.setColor("#ffcc66");
        server_info.setTimestamp(new Date());
        server_info.setFooter({
          text: String("V" + String(version)),
          iconURL: String(),
        });
        server_info.setDescription(
          String(
            [
              textu("> Name: ", s4dmessage.guild.name, null),
              textu("> Acronym: ", s4dmessage.guild.nameAcronym, null),
              textu("> Id: ", s4dmessage.guild.id, null),
              textu("> Owner: <@", s4dmessage.guild.ownerId, ">"),
              textu("> Owner id: ", s4dmessage.guild.ownerId, null),
              textu("> Partnered?: ", s4dmessage.guild.partnered, null),
              textu("> Verified?: ", s4dmessage.guild.verified, null),
              textu(
                "> Prefered locale: ",
                s4dmessage.guild.preferredLocale,
                null
              ),
              textu(
                "> Created: ",
                [
                  "<t:",
                  Math.floor(s4dmessage.guild.createdAt.getTime() / 1000),
                  ":R>",
                ].join(""),
                null
              ),
              textu(
                "> Discovery splash: ",
                s4dmessage.guild.discoverySplash,
                null
              ),
              textu("> Description: ", s4dmessage.guild.description, null),
            ].join("")
          )
        );
        server_info.addField(
          String("Stats"),
          String(
            [
              textu(
                "> Members: ",
                s4dmessage.guild.members.cache.filter((m) => !m.user.bot).size,
                null
              ),
              textu(
                "> Humans: ",
                s4dmessage.guild.members.cache.filter((m) => !m.user.bot).size -
                  s4dmessage.guild.members.cache.filter((m) => m.user.bot).size,
                null
              ),
              textu(
                "> Bots: ",
                s4dmessage.guild.members.cache.filter((m) => m.user.bot).size,
                null
              ),
              textu("> Roles: ", s4dmessage.guild.roles.cache.size, null),
              textu("> Channels: ", s4dmessage.guild.channels.cache.size, null),
              textu(
                "> Text: ",
                s4dmessage.guild.channels.cache.filter(
                  (m) => m.type === "GUILD_TEXT"
                ).size,
                null
              ),
              textu(
                "> Voice: ",
                s4dmessage.guild.channels.cache.filter(
                  (m) => m.type === "GUILD_VOICE"
                ).size,
                null
              ),
            ].join("")
          ),
          true
        );
        server_info.addField(
          String("Maximun"),
          String(
            [
              textu(
                "> Bitrate: ",
                s4dmessage.guild.maximumBitratemaximumMembers,
                null
              ),
              textu("> Members: ", s4dmessage.guild.maximumMembers, null),
              textu("> Présences: ", s4dmessage.guild.maximumPresences, null),
            ].join("")
          ),
          true
        );
        server_info.addField(
          String("Boost"),
          String(
            [
              textu(
                "> Boost bar?: ",
                s4dmessage.guild.premiumProgressBarEnabled,
                null
              ),
              textu("> Boost level: ", s4dmessage.guild.premiumTier, null),
              textu(
                "> Total boosts: ",
                s4dmessage.guild.premiumSubscriptionCount,
                null
              ),
            ].join("")
          ),
          true
        );
        server_info.addField(
          String("Moderation"),
          String(
            [
              textu("> MFA Level: ", s4dmessage.guild.mfaLevel, null),
              textu("> NSFW Level: ", s4dmessage.guild.nsfwLevel, null),
              textu("> Verification level: ", null, null),
              textu("> Rules channel: ", s4dmessage.guild.rulesChannel, null),
              textu("> System channel: ", s4dmessage.guild.systemChannel, null),
              textu(
                "> Explicit content filter",
                s4dmessage.guild.explicitContentFilter,
                null
              ),
              textu(
                "> Default message notifications: ",
                s4dmessage.guild.defaultMessageNotifications,
                null
              ),
            ].join("")
          ),
          true
        );
        server_info.addField(
          String("AFK Channel"),
          String(
            s4dmessage.guild.afkChannel == null
              ? "No AFK channel"
              : [
                  textu("**AFK Channel**", "", null),
                  textu("> Channel: ", s4dmessage.guild.afkChannel, null),
                  textu("> Channel id: ", s4dmessage.guild.afkChannelId, null),
                  time_gud(
                    textu("> AFK Timeout: ", s4dmessage.guild.afkTimeout, null)
                  ),
                  textu(
                    "> Channel position: ",
                    s4d.client.channels.cache.get(s4dmessage.guild.afkChannelId)
                      .position,
                    null
                  ),
                ].join("")
          ),
          true
        );
        if (s4dmessage.guild.banner == null) {
          server_info.addField(String("Banner"), String("No banner"), false);
        } else {
          server_info.addField(String("Banner"), String("** **"), false);
          server_info.setImage(String(s4dmessage.guild.banner));
        }

        s4dmessage.channel.send({
          embeds: [server_info],
        });

        break;
      case "role":
        var role_info = new Discord.MessageEmbed();
        role_info.setTimestamp(new Date());
        role_info.setFooter({
          text: String("V" + String(version)),
          iconURL: String(),
        });

        s4dmessage.channel.send({
          embeds: [role_info],
        });

        break;
      case "qr":
        var j_list8 =
          "igge,sex,cunt,motherfucker,fuk,fuc,pussy,penis,rape".split(",");
        for (var j_index9 in j_list8) {
          j = j_list8[j_index9];
          if (String(arguments2.join("")).includes(String(j))) {
            s4dmessage.reply({
              content: String(`Qr denied
              (invites or bad words detected)`),
              allowedMentions: {
                repliedUser: true,
              },
            });
            return;
          }
        }
        s4dmessage.reply({
          content: String("Disabeled"),
          allowedMentions: {
            repliedUser: true,
          },
        });

        break;
      case "random":
        if (!arguments2.length) {
          var rande = new Discord.MessageEmbed();
          rande.setTimestamp(new Date());
          rande.setFooter({
            text: String("V" + String(version)),
            iconURL: String(),
          });
          rande.setColor("#ff9966");
          rande.setTitle(String("Random"));
          rande.setURL(String());
          rande.setDescription(
            String(`After selection of type add number for quantity
              · String
              · Number
              · Fraction
              · Member`)
          );

          s4dmessage.channel.send({
            embeds: [rande],
          });
        } else {
          switch (arguments2.shift()) {
            case "string":
              if (arguments2[0] > 4000) {
                s4dmessage.channel.send({
                  content: String("Too big"),
                });
              } else {
                var rande = new Discord.MessageEmbed();
                rande.setTimestamp(new Date());
                rande.setFooter({
                  text: String("V" + String(version)),
                  iconURL: String(),
                });
                rande.setColor("#ff9966");
                rande.setTitle(String("Random string"));
                rande.setURL(String());
                rande.setDescription(String(S4D_makeid(arguments2[0])));

                s4dmessage.channel.send({
                  embeds: [rande],
                });
              }

              break;
            case "number":
              if (arguments2[0] > 4000) {
                s4dmessage.channel.send({
                  content: String("Too big"),
                });
              } else {
                c = "";
                var repeat_end3 = arguments2[0];
                for (var count3 = 0; count3 < repeat_end3; count3++) {
                  c = String(c) + String(mathRandomInt(0, 9));
                }
                var rande = new Discord.MessageEmbed();
                rande.setTimestamp(new Date());
                rande.setFooter({
                  text: String("V" + String(version)),
                  iconURL: String(),
                });
                rande.setColor("#ff9966");
                rande.setTitle(String("Random number"));
                rande.setURL(String());
                rande.setDescription(String(c));

                s4dmessage.channel.send({
                  embeds: [rande],
                });
              }

              break;
            case "fraction":
              if (arguments2[0] > 400) {
                s4dmessage.channel.send({
                  content: String("Too big"),
                });
              } else {
                c = "";
                var repeat_end4 = arguments2[0];
                for (var count4 = 0; count4 < repeat_end4; count4++) {
                  c = [c, Math.random(), "\n"].join("");
                }
                var rande = new Discord.MessageEmbed();
                rande.setTimestamp(new Date());
                rande.setFooter({
                  text: String("V" + String(version)),
                  iconURL: String(),
                });
                rande.setColor("#ff9966");
                rande.setTitle(String("Random fraction"));
                rande.setURL(String());
                rande.setDescription(String(c));

                s4dmessage.channel.send({
                  embeds: [rande],
                });
              }

              break;
            case "member":
              if (arguments2[0] > 100) {
                s4dmessage.channel.send({
                  content: String("Too big"),
                });
              } else {
                c = "";
                var repeat_end5 = arguments2[0];
                for (var count5 = 0; count5 < repeat_end5; count5++) {
                  c = [
                    c,
                    "<@",
                    s4dmessage.guild.members.cache.random().user.id,
                    "> ",
                  ].join("");
                }
                var rande = new Discord.MessageEmbed();
                rande.setTimestamp(new Date());
                rande.setFooter({
                  text: String("V" + String(version)),
                  iconURL: String(),
                });
                rande.setColor("#ff9966");
                rande.setTitle(String("Random member"));
                rande.setURL(String());
                rande.setDescription(String(c));

                s4dmessage.channel.send({
                  embeds: [rande],
                });
              }

              break;
          }
        }

        break;
      case "translate":
        break; /*
            case 'image':
                if (!arguments2.length) {} else {
                    if ((s4dmessage).attachments != null && (s4dmessage).attachments.size > 0) {
                        image = 0;
                        var JimpImageBlock = image;
                        await jimp.read(image, async (err, image) => {
                            if (err) throw err;
                            await image.blur(Number())

                        });
                        .send({
                            files: [(new Discord.MessageAttachment((await new DIG.Blur().getImage()), "image.png"))]
                        });
                    } else {}
                }

                break;*/
      case "discrimin":
        if (!arguments2.length) {
        } else {
          if (arguments2[0].length == 4) {
          } else {
          }
        }

        break;

      /*
                music
                */
      case "play":
        break;

      /*
                admin only
                */
      case "config":
        if (
          s4dmessage.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
        ) {
          if (!arguments2.length) {
            var config_help = new Discord.MessageEmbed();
            config_help.setTitle(String("Config help"));
            config_help.setURL(String());
            config_help.setColor("#ffcc66");
            config_help.setDescription(
              String(`Configurable values
                (To set value just do fsh!config thing)
                · Server lang (lang) - Set server language
                · Allow rob (rob) - Allow or disallow robbing`)
            );
            config_help.setFooter({
              text: String("V" + String(version)),
              iconURL: String(),
            });
            config_help.setTimestamp(new Date());

            s4dmessage.channel.send({
              embeds: [config_help],
            });
          } else {
            s4dmessage.channel.send({
              content: String("command not finished"),
            });
          }
        } else {
          s4dmessage.channel.send({
            content: String("only administrator can use this command"),
          });
        }

        break;
      case "ban":
        if (
          s4dmessage.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) ||
          s4dmessage.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
        ) {
          arguments2.shift();
          if (
            s4dmessage.mentions.users != null &&
            s4dmessage.mentions.users.size > 0
          ) {
            if (s4dmessage.member.bannable) {
            } else {
              s4dmessage.channel.send({
                content: String("member can't be banned by bot"),
              });
            }
          } else {
            s4dmessage.channel.send({
              content: String("you need to mention a member"),
            });
          }
        } else {
          s4dmessage.channel.send({
            content: String("only administrator can use this command"),
          });
        }

        break;
      case "unban":
        break;
      case "kick":
        if (
          s4dmessage.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
        ) {
          arguments2.shift();
          if (
            s4dmessage.mentions.users != null &&
            s4dmessage.mentions.users.size > 0
          ) {
            if (s4dmessage.member.kickable) {
            } else {
              s4dmessage.channel.send({
                content: String("member can't be kicked by bot"),
              });
            }
          } else {
            s4dmessage.channel.send({
              content: String("you need to mention a member"),
            });
          }
        } else {
          s4dmessage.channel.send({
            content: String("only administrator can use this command"),
          });
        }

        break;
      case "mute":
      case "timeout":
        if (
          s4dmessage.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
        ) {
          arguments2.shift();
          if (
            s4dmessage.mentions.users != null &&
            s4dmessage.mentions.users.size > 0
          ) {
            if (s4dmessage.member.moderatable) {
            } else {
              s4dmessage.channel.send({
                content: String("member can't be moderated by bot"),
              });
            }
          } else {
            s4dmessage.channel.send({
              content: String("you need to mention a member"),
            });
          }
        } else {
          s4dmessage.channel.send({
            content: String("only administrator can use this command"),
          });
        }

        break;
      case "unmute":
        break;
      case "nick":
        if (
          s4dmessage.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) ||
          s4dmessage.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)
        ) {
          arguments2.shift();
          if (
            s4dmessage.mentions.users != null &&
            s4dmessage.mentions.users.size > 0
          ) {
            try {
              s4dmessage.mentions.members
                .first()
                .setNickname(arguments2.join(" "));
            } catch (err) {
              s4dmessage.channel.send({
                content: String("bot was unable to change the nick"),
              });
            }
          } else {
            s4dmessage.channel.send({
              content: String("you need to mention a member"),
            });
          }
        } else {
          s4dmessage.channel.send({
            content: String("only administrator can use this command"),
          });
        }

        break;

      /*
                other
                */
      case "eval":
        if (
          [
            "816691475844694047",
            "712342308565024818",
            "1098211925495664751",
          ].includes(s4dmessage.member.id)
        ) {
          arguments2 = s4dmessage.content.split(" ");
          command = arguments2.shift();
          try {
            if (
              String(arguments2.join(" ")).includes(String("token")) ||
              String(arguments2.join(" ")).includes(String("env"))
            ) {
              evile = "Illegal input";
            } else {
              evile = await eval(arguments2.join(" "));
            }
            var evol = new Discord.MessageEmbed();
            evol.setTitle(
              String("<:terminal:1075167551962742934> Eval success")
            );
            evol.setURL(String());
            evol.setColor("#33ff33");
            evol.setDescription(
              String(
                [
                  "Response:",
                  "\n",
                  String(
                    String(evile).replaceAll(
                      process.env[String("token")],
                      String("[TOKEN]")
                    )
                  ).replaceAll(
                    process.env[String("client")],
                    String("[CLIENT]")
                  ),
                ].join("")
              )
            );
          } catch (err) {
            var evol = new Discord.MessageEmbed();
            evol.setTitle(String("<:terminal:1075167551962742934> Eval error"));
            evol.setURL(String());
            evol.setColor("#ff0000");
            evol.setDescription(
              String(
                [
                  "Response:",
                  "\n",
                  String(
                    String(err).replaceAll(
                      process.env[String("token")],
                      String("[TOKEN]")
                    )
                  ).replaceAll(
                    process.env[String("client")],
                    String("[CLIENT]")
                  ),
                ].join("")
              )
            );
          }
          s4dmessage.channel.send({
            embeds: [evol],
          });
        } else {
          if (String(s4dmessage.content).includes(String("no"))) {
            s4dmessage.channel.send({
              content: String("yes"),
            });
          } else {
            s4dmessage.channel.send({
              content: String("no"),
            });
          }
        }

        break;
      default:
        var not_found = new Discord.MessageEmbed();
        not_found.setTitle(String("Command not found"));
        not_found.setURL(String());
        not_found.setFooter({
          text: String("V" + String(version)),
          iconURL: String(),
        });
        not_found.setTimestamp(new Date());
        not_found.setColor("#ff0000");
        not_found.setDescription(
          String(`The command you are looking for was not found
            Make sure spelling is correct`)
        );

        s4dmessage.channel.send({
          embeds: [not_found],
        });

        break;
    }
  });

  s4d.client.on("messageCreate", async (s4dmessage) => {
    if (
      s4dmessage.author ==
        s4d.client.users.cache.get(String("1068782292438368266")) &&
      s4dmessage.content == "fsh"
    ) {
      s4dmessage.delete();
    }
  });

  return s4d;
})();
