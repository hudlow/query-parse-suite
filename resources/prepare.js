import fs from 'fs';
import crypto from 'crypto';
import * as commonmark from "commonmark";
import hljs from 'highlight.js';
import yaml from 'yaml';
import dotnetMinimalResults from '../dotnet-minimal-results/results.json' assert { type: 'json' };
import goVanillaResults from '../go-vanilla-results/results.json' assert { type: 'json' };
import javaSpringResults from '../java-spring-results/results.json' assert { type: 'json' };
import nodeExpressResults from '../node-express-results/results.json' assert { type: 'json' };
import phpVanillaResults from '../php-vanilla-results/results.json' assert { type: 'json' };
import pythonDjangoResults from '../python-django-results/results.json' assert { type: 'json' };
import rubyOnRailsResults from '../ruby-on-rails-results/results.json' assert { type: 'json' };
import whatwgURLResults from '../whatwg-url-results/results.json' assert { type: 'json' };

var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();

const file = fs.readFileSync('./queries.yaml', 'utf8');
const queries = yaml.parse(file);
let sections = {};

function hue(value) {
  return parseInt(md5(value).substring(0, 8), 16) % 360;
}

function renderResult(object) {
  const json = JSON.stringify(object, null, 2);
  let render = hljs.highlight(json, {language: 'json'}).value;
  let hueValue = hue(json);
  let kind = "json";

  if (json === '"error parsing parameters"') {
    render = '&#9888;&#65039;';
    hueValue = 0;
    kind = 'error';
  }

  return {
    json: render,
    hue: hueValue,
    kind
  }
}

function md5(value) {
  return crypto.createHash('md5').update(value).digest("hex");
}

function decomposeQuery(query) {
  return (
    [...query.matchAll(/(?<amp>&|^)(?<name>[^&=]*)(?<eq>=)?(?<value>[^&]*)/g)]
    .map(result => ({
      amp: result.groups.amp,
      name: result.groups.name,
      eq: result.groups.eq,
      value: result.groups.value,
      decodedName: decodeURIComponent(result.groups.name),
      decodedValue: decodeURIComponent(result.groups.value)
    }))
  );
}

function renderCommonMark(text) {
  if (typeof text === 'string') {
    const parsed = reader.parse(text);
    return writer.render(parsed);
  } else {
    return '';
  }
}

for (const index in queries) {
  if (!sections[queries[index].section]) {
    sections[queries[index].section] = {
      name: queries[index].section,
      results: []
    };
  }
  sections[queries[index].section].results.push({
    query: queries[index].query,
    querySegments: decomposeQuery(queries[index].query),
    description: renderCommonMark(queries[index].description),
    frameworks: [
      renderResult(dotnetMinimalResults[index].result),
      renderResult(goVanillaResults[index].result),
      renderResult(javaSpringResults[index].result),
      renderResult(nodeExpressResults[index].result),
      renderResult(phpVanillaResults[index].result),
      renderResult(pythonDjangoResults[index].result),
      renderResult(rubyOnRailsResults[index].result),
      renderResult(whatwgURLResults[index].result)
    ]
  });
}

process.stdout.write(JSON.stringify(
  {
    frameworks: [
      ".NET (minimal)",
      "Go (vanilla)",
      "Java (Spring)",
      "Node (Express)",
      "PHP (vanilla)",
      "Python (Django)",
      "Ruby (on Rails)",
      "WHATWG URL"
    ],
    sections: Object.values(sections)
  }
) + "\n");
