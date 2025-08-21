// fsh.io: full socket server
module.exports = async(fsh, socket, data) => {
  let endpoint = data.endpoint?.toLowerCase() || null;

  /* -- No endpoint -- */
  if (!endpoint)
    return socket.emit("api", {
      message: `specify and endpoint. e.x. { endpoint: "ping" }`,
    });

  /* -- Ping -- */
  if (endpoint == "ping") {
    return socket.emit("api", {
      message: fsh.client.ws.ping,
    });
  }

  if (endpoint == "activity") {
    if (!data.userid)
      return socket.emit("api", {
        message: `specify user ID. e.x. {userid: "1234567890"}`,
      });
    let user;
    try {
        user = await fsh.client.guilds.cache.get('1087466125467582554').members.fetch(data.userid);
        // message.guild.members.cache.get(arguments2[0])
        if (user == undefined) throw new Error("balls");
      } catch (err) {
        return socket.emit("api", {
          message: 'user not in fsh server'
        })
      }
    socket.emit("api", {
      message: user.presence?.activities || []
    })
    return
  }

  /* -- Endpoint no exist -- */
  return socket.emit("api", {
    response: `non-existing '${endpoint}' endpoint`,
  });
};
