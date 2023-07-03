import queries from './queries.json' assert { type: 'json' };
import nodeExpressResults from './node-express-results/results.json' assert { type: 'json' };
import phpVanillaResults from './php-vanilla-results/results.json' assert { type: 'json' };

let results = [];

for (const index in queries) {
  results[index] = {
    query: queries[index],
    frameworks: [
      JSON.stringify(nodeExpressResults[index], null, 2),
      JSON.stringify(phpVanillaResults[index], null, 2)
    ]
  };
}


process.stdout.write(JSON.stringify(
  {
    frameworks: ["Node / Express", "PHP (vanilla)"],
    results
  }
) + "\n");
