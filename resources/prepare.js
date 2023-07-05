import hljs from 'highlight.js';
import queries from '../queries.json' assert { type: 'json' };
import goVanillaResults from '../go-vanilla-results/results.json' assert { type: 'json' };
import javaSpringResults from '../java-spring-results/results.json' assert { type: 'json' };
import nodeExpressResults from '../node-express-results/results.json' assert { type: 'json' };
import phpVanillaResults from '../php-vanilla-results/results.json' assert { type: 'json' };
import pythonDjangoResults from '../python-django-results/results.json' assert { type: 'json' };
import rubyOnRailsResults from '../ruby-on-rails-results/results.json' assert { type: 'json' };

let results = [];

function renderResult(object) {
  const json = JSON.stringify(object, null, 2);
  return hljs.highlight(json, {language: 'json'}).value;
}

for (const index in queries) {
  results[index] = {
    query: queries[index],
    frameworks: [
      renderResult(goVanillaResults[index].result),
      renderResult(javaSpringResults[index].result),
      renderResult(nodeExpressResults[index].result),
      renderResult(phpVanillaResults[index].result),
      renderResult(pythonDjangoResults[index].result),
      renderResult(rubyOnRailsResults[index].result)
    ]
  };
}


process.stdout.write(JSON.stringify(
  {
    frameworks: [
      "Go (vanilla)",
      "Java (Spring)",
      "Node (Express)",
      "PHP (vanilla)",
      "Python (Django)",
      "Ruby (on Rails)"
    ],
    results
  }
) + "\n");
