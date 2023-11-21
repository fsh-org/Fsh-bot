// omg linked roles totally i didn't create :trol:
// :trol:

const config = {
  DISCORD_TOKEN: process.env["token"],
  DISCORD_CLIENT_ID: "1068572316986003466",
  DISCORD_CLIENT_SECRET: process.env["client"],
  DISCORD_REDIRECT_URI: process.env["uri"],
  COOKIE_SECRET: process.env["cookie"],
};

/*
 * Register the metadata to be stored by Discord. This should be a one time action.
*/
const url = `https://discord.com/api/v10/applications/${config.DISCORD_CLIENT_ID}/role-connections/metadata`;
// supported types: number_lt=1, number_gt=2, number_eq=3 number_neq=4, datetime_lt=5, datetime_gt=6, boolean_eq=7, boolean_neq=8
const body = [
  {
    key: 'fshwallet',
    name: 'Net fsh',
    description: 'Has more fsh in net than',
    type: 2,
  },
  {
    key: 'fshbank',
    name: 'Tank fsh',
    description: 'Has more fsh in tank than',
    type: 2,
  }
];

const response = await fetch(url, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bot ${config.DISCORD_TOKEN}`,
  },
});
if (response.ok) {
  const data = await response.json();
  console.log("Registered role connections");
} else {
  const data = await response.text();
  console.log("Possible error");
}
