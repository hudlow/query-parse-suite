import * as http from 'http';
const port = 1866;

http.createServer(function (request, response) {
  let output = [];

  if (request.url.indexOf('?') !== -1) {
    const input = request.url.substring(request.url.indexOf('?') + 1);
    const sequences = input.split('&');

    for (const sequence of sequences) {
      if (sequence === '') {
        continue;
      }

      const equalIndex = sequence.indexOf('=');
      let name, value;

      if (equalIndex !== -1) {
        name = sequence.substring(0, equalIndex);
        value = sequence.substring(equalIndex+1);
      } else {
        name = sequence;
        value = '';
      }

      name = percentDecode(name.replaceAll('+', ' '));
      value = percentDecode(value.replaceAll('+', ' '));

      output.push([name, value])
    }
  }

  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(output) + "\n");
}).listen(port);

function percentDecode(value) {
  const input = value.split('');
  let output = '';

  for (let index = 0; index < input.length; ++index) {
    if (input[index] !== '%') {
      output += input[index];
    } else if (value.substring(index+1, index+3).match(/^[0-9a-fA-F]{2}$/) === null) {
      output += input[index];
    } else {
      output += String.fromCharCode(parseInt(value.substring(index+1, index+3), 16));
      index += 2;
    }
  }

  return output;
}
