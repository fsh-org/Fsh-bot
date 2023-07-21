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
  const os = require("os-utils");
  let URL = require("url");
  let https = require("https");
  const S4D_WEBSITECREATION_EXPRESS = require("express");
  const S4D_WEBSITECREATION_bodyParser = require("body-parser");
  const S4D_WEBSITECREATION_cors = require("cors");
  var S4D_WEBSITECREATION_path = require("path");
  const S4D_WEBSITECREATION_EXPRESS_app = S4D_WEBSITECREATION_EXPRESS();

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

  // check if d.js is v13
  if (
    !require("../package.json").dependencies["discord.js"].startsWith("^13.")
  ) {
    let file = JSON.parse(fs.readFileSync("package.json"));
    file.dependencies["discord.js"] = "^13.15.1";
    fs.writeFileSync("package.json", JSON.stringify(file));
    exec("npm i");
    throw new Error(
      "Seems you arent using v13 please re-run or run `npm i discord.js@13.12.0`"
    );
  }

  // check if discord-logs is v2
  if (
    !require("../package.json").dependencies["discord-logs"].startsWith("^2.")
  ) {
    let file = JSON.parse(fs.readFileSync("package.json"));
    file.dependencies["discord-logs"] = "^2.0.0";
    fs.writeFileSync("package.json", JSON.stringify(file));
    exec("npm i");
    throw new Error(
      "discord-logs must be 2.0.0. please re-run or if that fails run `npm i discord-logs@2.0.0` then re-run"
    );
  }

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

  // blockly code
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

  const reason = true;

  const reason_txt = `fixin things / looking into errors`;

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
    res.send(String("Maintenance mode"));
    res.status(Number(503));
  });
  S4D_WEBSITECREATION_EXPRESS_app.use(function (req, res) {
    res.send(String("Maintenance mode"));
    res.status(Number(503));
  });

  S4D_WEBSITECREATION_EXPRESS_app.listen(S4D_APP_WEBSITE_HOSTING_PORT);
  s4d.client.on("messageCreate", async (s4dmessage) => {
    if (s4dmessage.author.bot) {
      return;
    }
    if (
      String(s4dmessage.content.toLowerCase()).includes(String("fsh")) &&
      !String(s4dmessage.content.toLowerCase()).includes(String("fsh!"))
    ) {
      s4dmessage.channel.send({
        content: String("fsh"),
      });
    }
    if ((s4dmessage.content.toLowerCase() || "").startsWith("fsh!" || "")) {
      var embed1 = new Discord.MessageEmbed();
      embed1.setTitle(String("Mantinence"));
      embed1.setURL(String());
      if (reason) {
        embed1.setDescription(
          String(
            [
              `Fsh is down for maintenance.
            Info:`,
              "\n",
              reason_txt,
              "\n",
              "Check later to see if Fsh is back to normal or additional information is provided",
            ].join("")
          )
        );
      } else {
        embed1.setDescription(
          String(
            "Fsh is down for maintenance. Check later to see if Fsh is back to normal or additional information is provided"
          )
        );
      }
      embed1.setColor("#ffcc66");
      embed1.setImage(
        String(
          "https://cdn.discordapp.com/attachments/1094333350401024070/1096449641383464960/A4bH2NmkNcWiAAAAAElFTkSuQmCC.png"
        )
      );

      s4dmessage.channel.send({
        embeds: [embed1],
      });
    }
  });

  return s4d;
})();
