import hljs from 'highlight.js';
import queries from '../queries.json' assert { type: 'json' };
import nodeExpressResults from '../node-express-results/results.json' assert { type: 'json' };
import phpVanillaResults from '../php-vanilla-results/results.json' assert { type: 'json' };

let results = [];

function renderResult(object) {
  const json = JSON.stringify(object, null, 2);
  return hljs.highlight(json, {language: 'json'}).value;
}

for (const index in queries) {
  results[index] = {
    query: queries[index],
    frameworks: [
      renderResult(nodeExpressResults[index].result),
      renderResult(phpVanillaResults[index].result)
    ]
  };
}


process.stdout.write(JSON.stringify(
  {
    frameworks: ["Node (Express)", "PHP (vanilla)"],
    results
  }
) + "\n");
