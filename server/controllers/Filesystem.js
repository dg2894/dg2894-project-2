const fs = require('fs');

const pikaday = fs.readFileSync(`${__dirname}/../../hosted/pikaday/pikaday.js`);
const pikadayCSS = fs.readFileSync(`${__dirname}/../../hosted/pikaday/css/pikaday.css`);

const getPikaday = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/javascript' });
  res.write(pikaday);
  res.end();
};

const getPikadayCSS = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/css' });
  res.write(pikadayCSS);
  res.end();
};

module.exports.getPikaday = getPikaday;
module.exports.getPikadayCSS = getPikadayCSS;
