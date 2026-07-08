const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const key = env.match(/VITE_GEMINI_API_KEY=\s*\"?([^\n\"]+)/)[1];
console.log('Key:', key);
fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + key, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ contents: [{role: 'user', parts: [{text: 'hello'}]}] })
}).then(async r => {
  console.log('Status:', r.status);
  console.log('Body:', await r.text());
}).catch(console.error);
