const typeToNumber = {
  'string': 3,
  'number': 4,
  'boolean': 5,
  'user': 6,
  'channel': 7,
  'role': 8,
  'mentionable': 9,
  'file': 11,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  '11': 11
};

function RegisterSlash(fsh) {
  let cmds = fsh.client.textcommands;
  let json = [];
  cmds.filter(cmd => cmd?.slash).map(cmd => {
    let base = fsh.lang.en.get(`commands.${cmd.name}`);
    let trn = {};
    let trd = {};
    fsh.lang.available.map(lang => {
      let tr = fsh.lang[lang.toLowerCase().replace('-','_')].get(`commands.${cmd.name}`);
      trn[lang] = tr.name;
      trd[lang] = tr.info;
    });
    let obj = {
      type: 1,
      name: base.name,
      description: base.info,
      name_localizations: trn,
      description_localizations: trd
    };
    if (cmd?.params) {
      obj.options = [];
      cmd.params.forEach(param => {
        let pn = {};
        let pd = {};
        fsh.lang.available.map(lang => {
          let ptr = fsh.lang[lang.toLowerCase().replace('-','_')].get(`commands.${cmd.name}.params.${param.name}`);
          pn[lang] = ptr.name;
          pd[lang] = ptr.info;
        });
        let objp = {
          type: typeToNumber[param.type.toString().toLowerCase()],
          name: base.params[param.name].name,
          description: base.params[param.name].info,
          required: param.required ?? true,
          name_localizations: pn,
          description_localizations: pd
        };
        if (param?.min) objp[param.type==='string'?'min_length':'min_value'] = param.min;
        if (param?.max) objp[param.type==='string'?'max_length':'max_value'] = param.max;
        if (param?.choices) {
          objp.choices = [];
          param.choices.forEach(choice => {
            let locn = {};
            fsh.lang.available.map(lang => {
              locn[lang] = fsh.lang[lang.toLowerCase().replace('-','_')].get(`commands.${cmd.name}.params.${param.name}.choices.${choice.name}`);
            });
            let objc = {
              name: choice.name,
              name_localizations: locn,
              value: choice.value
            };
            objp.choices.push(objc);
          });
        }
        obj.options.push(objp);
      });
    }
    json.push(obj);
  });
  fetch('https://discord.com/api/v10/applications/1068572316986003466/commands', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: `Bot ${process.env['token']}`
    },
    body: JSON.stringify(json)
  })
    .then(res=>res.json())
    .then(res=>console.log(JSON.stringify(res)))
    .catch(err=>console.error(err));
  if (process.env['topgg']) {
    fetch('https://top.gg/api/v1/projects/@me/commands', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${process.env['topgg']}`
      },
      body: JSON.stringify(json)
    });
  }
}

module.exports = RegisterSlash;