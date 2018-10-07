import spacewell from "./spacewell";
// import smcp from 'scmp';

document
   .getElementsByTagName("article")
   .forEach(spacewell({ emDashes: true, enDashes: true, quotes: true }));
