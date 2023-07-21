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
    /*if (typeof((Number(arguments2[0]))) != "NaN") {
		  let reu;
		  if (RegExp("^1?$|^(11+?)\1+$").test(listsRepeat('1', Number(arguments2[0])).join('')) && !(arguments2[0] == "optimus")) {
		    reu = "not a prime"
		  } else {
		    reu = "a prime"
		  }
		  message.channel.send(arguments2[0]+" is "+reu)
		} else {
		  message.channel.send("You must provide a number")
		}*/
    // program to check if a number is prime or not
    if (!isNaN(Number(arguments2[0]))) {
      const number = parseInt(arguments2[0]);
      let isPrime = true;
      let res;
      if (number === 1) {
        res = "neither prime nor composite";
      } else if (number > 1) {
        for (let i = 2; i < number; i++) {
          if (number % i == 0) {
            isPrime = false;
            break;
          }
        }
        if (isPrime) {
          res = `a prime`;
        } else {
          res = `not a prime`;
        }
      } else {
        res = "not a prime";
      }
      message.channel.send(arguments2[0] + " is " + res);
    } else {
      if (arguments2[0] == "optimus")
        return message.channel.send(arguments2[0] + " is a prime");
      message.channel.send("You must provide a number");
    }
  },
};
