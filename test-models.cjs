const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const key = env.match(/VITE_GEMINI_API_KEY=\s*\"?([^\n\"]+)/)[1];
fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + key)
.then(async r => {
  const data = await r.json();
  fs.writeFileSync('models.json', JSON.stringify(data.models.map(m => m.name), null, 2));
}).catch(console.error);
