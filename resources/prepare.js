import commonmark from 'commonmark';
import hljs from 'highlight.js';
import yaml from 'yaml';
import goVanillaResults from '../go-vanilla-results/results.json' assert { type: 'json' };
import javaSpringResults from '../java-spring-results/results.json' assert { type: 'json' };
import nodeExpressResults from '../node-express-results/results.json' assert { type: 'json' };
import phpVanillaResults from '../php-vanilla-results/results.json' assert { type: 'json' };
import pythonDjangoResults from '../python-django-results/results.json' assert { type: 'json' };
import rubyOnRailsResults from '../ruby-on-rails-results/results.json' assert { type: 'json' };

var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();

const file = fs.readFileSync('./queries.yaml', 'utf8');
const queries = yaml.parse(file);
let results = [];

function renderResult(object) {
  const json = JSON.stringify(object, null, 2);
  return hljs.highlight(json, {language: 'json'}).value;
}

function renderCommonMark(text) {
 const parsed = reader.parse(text);
 return writer.render(parsed);
}

for (const index in queries) {
  if (!results[queries[index].section]) {
    results[queries[index].section] = [];
  }
  results[queries[index].section].push({
    query: queries[index].query,
    description: renderCommonMark(queries[index].description),
    frameworks: [
      renderResult(goVanillaResults[index].result),
      renderResult(javaSpringResults[index].result),
      renderResult(nodeExpressResults[index].result),
      renderResult(phpVanillaResults[index].result),
      renderResult(pythonDjangoResults[index].result),
      renderResult(rubyOnRailsResults[index].result)
    ]
  });
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
