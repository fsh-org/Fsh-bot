function listsRepeat(value, n) {
  var array = [];
  for (var i = 0; i < n; i++) {
    array[i] = value;
  }
  return array;
}

module.exports = {
  name: "prime",
  params: ["number", true],
  info: "Tells you if number is prime",
  category: "utility",
  async execute(message, arguments2, fsh) {
    if (arguments2[0] == "optimus") {
      message.channel.send("opptimus is a prime");
      return;
    }

    if (!isNaN(Number(arguments2[0]))) {
      const number = parseInt(arguments2[0]);
      let isPrime = true;
      let res;
      if (number === 1) {
        res = "neither prime nor composite";
      }
      if (number === 2) {
        res = "prime";
      }
      if (number > 2) {
        if (number % 2 == 0) {
          isPrime = false
        } else {
          for (let i = 3; i < number; i=i+2) {
            if (number % i == 0) {
              isPrime = false;
              break;
            }
          }
        }
        res = `${isPrime?"":"not "}a prime`;
      }
      if (number < 0) {
        res = "not a prime";
      }
      message.channel.send(
        `${arguments2[0]} is ${res}`
      );
    } else {
      message.channel.send("You must provide a number");
    }
  },
};
