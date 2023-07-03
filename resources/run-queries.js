import fetch from 'node-fetch';
import queries from './queries.json' assert { type: 'json' };

(async () => {
  try {
    let responses = [];
    let frameworkResults = [];

    for (const index in queries) {
      responses[index] = fetch('http://localhost:1866?' + queries[index]);
    }

    for (const index in queries) {
      const result = await (await responses[index]).json();
      frameworkResults[index] = {
        query: queries[index],
        result
      }
    }

    process.stdout.write(JSON.stringify(frameworkResults) + "\n");
  } catch (error) {
    console.error(error);
  }
})();
