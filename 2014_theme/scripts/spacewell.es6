// Wrap em dashes and their immediate neighbors in non-breaking span and
// hair spaces.
function _emDashes(content) {
  if (!content) {
    console.error("spacewell::emDashes(): no content supplied.");
    return;
  }

  const open = /([\w\d‘’“”\)\]\>]+)/;
  const dashes = /(—|&mdash;|&#8212;|&x2014;)/;
  const close = /([\w\d‘’“”\(\[\<]+)/;
  const patt = new RegExp(`${open}${dashes}${close}`, 'g');

  const repl = `<span style="white-space: nowrap">$1&hairsp;$2&hairsp;$3</span>`;

  return content.replace(patt, repl);
}


// Wrap en dashes and their immediate neighbors in non-breaking span and
// thin spaces (for words, replacing normal spaces) or hair spaces (for
// numbers).
function _enDashes(content) {
  if (!content) {
    console.error("spacewell::enDashes(): no content supplied.");
    return;
  }

  const span = '<span style="white-space: nowrap">';
  const unspan = '</span>'

  // Do numbers *first*. Include a variety of ways digits might be constructed
  // including e.g. Bible verses, other punctuation, etc.
  const numPatt = /([\d:\.]+) ?(–|&ndash;|&8211;|&x2013;) ?(\d+)/g;
  const numRepl = `${span}$1&hairsp;$2&hairsp;$3${unspan}`;
  const numReplaced = content.replace(numPatt, numRepl);

  const wordPatt = /(\w+) ?(–|&ndash;|&8211;|&x2013;) ?(\w+)/g;
  const wordRepl = `${span}$1&thinsp;$2&thinsp;$3${unspan}`;
  const wordsReplaced = numReplaced.replace(wordPatt, wordRepl);

  return wordsReplaced;
}


// Take e.g. "J. R. R. Tolkien" or "J.R.R. Tolkien" and use thin spaces
// between the initials.
function _initials(content) {
  if (!content) {
    console.error("spacewell::initials(): no content supplied.");
    return;
  }

  // TODO: implement this in a way that doesn't mistake ends of
  //     sentences. Basically, I *think* it should just be anytime
  //     that the period follows a capital letter, but there may be
  //     the occasional exception.
  console.error("spacewell::initials() not yet implemented.")
}


/**
  Given a valid DOM element `container`, apply nice typographical spacing.
  @param  {Node}     container         A document element to apply rules to.
  @param  {Object}   options           Options for which spacing rules to use.
  @param  {boolean}  options.emDashes  Wrap em dashes in hair spaces.
  @param  {boolean}  options.enDashes  Wrap em dashes in thin spaces.
  @param  {boolean}  options.initials  Separate initials with thin spaces.
 */
function spacewell(container, options) {
  // Actually run the function.
  if (!container) {
    console.error("spacewell: no container element supplied.");
    return;
  }

  if (!container.innerHTML) { return; }

  // NOTE: keys are mapped to names of functions in the module.
  // TODO: expand to support broader functionality, e.g. the kind of space to
  //       use in wrapping a given element and exceptions (e.g. to turn off the
  //       rule for given element types).
  const defaultOpts = { emDashes: true, enDashes: true, initials: true };
  const config = options || defaultOpts;

  const functions = {
    "emDashes": _emDashes,
    "enDashes": _enDashes,
    "initials": _initials
  };

  var content = container.innerHTML;
  for (const opt in config) {
    if (config[opt]) {
      content = functions[opt](content);
    }
  }

  container.innerHTML = content;
}


export default spacewell;
