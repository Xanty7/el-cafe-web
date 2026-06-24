const fs = require('fs');

async function fetchCSV() {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSFJTf0bTt2qrH4dtYQH7fY8vK_hXusXNOQACr1kxjwxkZO2awiqghkuhmMhVueaNOKJNxg4tyCZZr5/pub?output=csv";
  const res = await fetch(url);
  const text = await res.text();
  console.log(text.split('\n').slice(0, 5).join('\n'));
}

fetchCSV();
