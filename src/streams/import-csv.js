import fs from 'fs';
import { parse } from 'csv-parse';

const __dirname = new URL('./tasks.csv', import.meta.url);

(async () => {
  const parser = fs.createReadStream(__dirname).pipe(
    parse({
      delimiter: ',',
      skipEmptyLines: true,
      fromLine: 2,
    }),
  );

  for await (const chunk of parser) {
    const [title, description] = chunk;

    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }
})();
