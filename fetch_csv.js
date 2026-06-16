const fs = require('fs');

async function fetchCSV() {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQQtQx3sdZuXOu5ma1lmdVfEm1MM7X3rkeUgk6LqbObTZaXmkB1x089RRfqxqiTrXHvvBcBxL7o1Xgn/pub?output=csv";
  const res = await fetch(url);
  const text = await res.text();
  console.log(text.split('\n').slice(0, 5).join('\n'));
}

fetchCSV();
