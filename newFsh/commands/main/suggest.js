module.exports = {
  name: "suggest",
  params: ["item", true],
  info: "Suggest features or report bugs",
  category: "main",
  async execute(message, arguments2, fsh) {
    if (!arguments.length)
      return message.channel.send({
        content: String("Please actually suggest somthing to send"),
      });
    let content = `${message.author.username} (<@${message.author.id}>/${
      message.author.id
    }) **suggested:**\n${arguments2.join(" ")}`;
    // not send to channel while censor api no workie
    if (false) {
      fsh.client.channels.cache
        .get("1117473022878687392")
        .send({
          content,
        })
        .then((suggested) => {
          suggested.react("👍");
          suggested.react("👎");
        });
    } else {
      fsh.client.users.cache.get("816691475844694047").send({
        content,
      });
    }
    message.channel.send({
      content: String("suggestion sent"),
    });
  },
};
