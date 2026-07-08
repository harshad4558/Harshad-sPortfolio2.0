const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const key = env.match(/VITE_GEMINI_API_KEY=\s*\"?([^\n\"]+)/)[1];
fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + key, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ contents: [{role: 'user', parts: [{text: 'hello'}]}] })
}).then(async r => {
  console.log('Status gemini-pro:', r.status);
  console.log('Body:', await r.text());
}).catch(console.error);
