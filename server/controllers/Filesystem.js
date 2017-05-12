const fs = require('fs');

const pikaday = fs.readFileSync(`${__dirname}/../../hosted/pikaday/pikaday.js`);
const pikadayCSS = fs.readFileSync(`${__dirname}/../../hosted/pikaday/css/pikaday.css`);

const favorite = fs.readFileSync(`${__dirname}/../../hosted/img/favorite.png`);
const unfavorite = fs.readFileSync(`${__dirname}/../../hosted/img/unfavorite.png`);
const resume = fs.readFileSync(`${__dirname}/../../hosted/img/resume.png`);

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

const getFavoriteIcon = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.write(favorite);
  res.end();
};

const getUnfavoriteIcon = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.write(unfavorite);
  res.end();
};

const getResume = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.write(resume);
  res.end();
};

module.exports.getPikaday = getPikaday;
module.exports.getPikadayCSS = getPikadayCSS;
module.exports.getFavoriteIcon = getFavoriteIcon;
module.exports.getUnfavoriteIcon = getUnfavoriteIcon;
module.exports.getResume = getResume;
