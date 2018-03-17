import spacewell from './spacewell';
// import smcp from 'scmp';

const articles = document.getElementsByTagName('article');
const options = { emDashes: true, enDashes: true, quotes: true };
for (const a in articles) {
  if (articles.hasOwnProperty(a)) { spacewell(articles[a], options); }
}
