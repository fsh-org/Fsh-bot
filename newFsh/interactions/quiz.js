const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  async execute(message) {
    // Is it a embed?
    try {
      if (!message.embeds[0]) return;
      if (!message.embeds[0].data) return;
    } catch (err) {
      return;
    }
    // is user blocked?
    try {
      if (['899368692301836319','1045764183288987689'].includes(Array.from(message.mentions.users)[0])) return;
    } catch (err) {
      return;
    }
    // user has quiz solver? if yes don't continue
    if (message.embeds[0].data.description.includes("Quiz Solver:")) return;
    
    // get contents and check if quiz
    let a = String(message.embeds[0].data.description || "").replaceAll(" ","").match(/[0-9]{1,3}(\+|-|\*)[0-9]{1,3}/g)
    if (!a) return;
    if (!a[0]) return;
    a = a[0]

    // Do math
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
    }
    // send message, delete after 5 secs
    // keep it message in the channel
    message.reply(String(a) + "** **").then(async (msg) => {
      await delay(5 * 1000);
      msg.delete();
    });
  }
}