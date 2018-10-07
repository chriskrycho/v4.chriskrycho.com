import spacewell from "./spacewell";
// import smcp from 'scmp';

const process = spacewell({ emDashes: true, enDashes: true, quotes: true });
for (const article of document.getElementsByTagName("article")) {
   process(article);
}
