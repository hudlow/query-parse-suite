const express = require('express');
const app = express();
const port = 1866;

app.get('/', (request, response) => {
  let parameters = {};

  for (const param in request.query) {
    let value = request.query[param];

    if (param === 'cast_to_boolean') {
      value = Boolean(value);
    } else if (param === 'cast_to_integer') {
      value = parseInt(value);
    } else if (param === 'cast_to_float') {
      value = parseFloat(value);
    } else if (param === 'cast_to_date_time') {
      let date = new Date();
      date.setTime(Date.parse(value));
      value = date.toJSON();
    }

    parameters[param] = JSON.stringify(value);
  }

  response.send(JSON.stringify(parameters) + "\n");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
