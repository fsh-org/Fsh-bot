const fs = require("fs");

module.exports = {
  name: "lemon",
  params: ["user", true],
  info: "Lemon a user",
  category: "fun",
  async execute(message, arguments2, fsh) {
    if (message.mentions.users != null && message.mentions.users.size > 0) {
      if (fsh.cooldown.has(String(String(message.author.id) + "-lemon"))) {
        if (
          Math.floor(new Date().getTime() / 1000) <
          fsh.cooldown.get(String(String(message.author.id) + "-lemon")) + 3600
        ) {
          message.channel.send({
            content: String(
              String("you will be able to lemon again <t:%r%:R>").replaceAll(
                "%r%",
                String(
                  String(
                    fsh.cooldown.get(
                      String(String(message.author.id) + "-lemon")
                    ) + 3600
                  )
                )
              )
            ),
          });
          return;
        }
      }
      message.mentions.members.first().send({
        content: String(
          fs
            .readFileSync("text/lemon.txt", "utf8")
            .replaceAll("{a}", String(message.author.username))
        ),
      });
      message.channel.send({
        content: String("lemon sent"),
      });
      fsh.cooldown.set(
        String(String(message.author.id) + "-lemon"),
        Math.floor(new Date().getTime() / 1000)
      );
    } else {
      message.channel.send({
        content: String("you need to mention someone"),
      });
    }
  },
};
