function quotes(content) {
   if (!content) {
      console.error("spacewell::quotes(): no content supplied.");
      return;
   }

   const dquo_patt = /(“|&ldquo;|&#8220;)/g;
   const dquo_repl = "<dquo-push></dquo-push><dquo-pull> $1</dquo-pull>";
   const squo_patt = /(‘|&lsquo;|&#8216;)/g;
   const squo_repl = "<squo-push></squo-push><squo-pull> $1</squo-pull>";

   const dquo_pulled = content.replace(dquo_patt, dquo_repl);
   const squo_pulled = dquo_pulled.replace(squo_patt, squo_repl);
   return squo_pulled;
}

const NO_BREAK_NARROW_SP = "&#8239;";
const HAIR_SP = "&hairsp";
const EM_DASH = "&mdash;";
const EN_DASH = "&ndash";

// Wrap em dashes and their immediate neighbors in non-breaking span and
// hair spaces. Normalize which em dash variant is used.
function emDashes(content) {
   if (!content) {
      console.error("spacewell::emDashes(): no content supplied.");
      return;
   }

   return content.replace(
      /(—|&mdash;|&#8212;|&x2014;)/,
      `${HAIR_SP}${EM_DASH}${HAIR_SP}`
   );
}

// Wrap en dashes and their immediate neighbors in non-breaking span and
// thin spaces (for words, replacing normal spaces) or hair spaces (for
// numbers). Normalize which en dash variant is used.
function enDashes(content) {
   if (!content) {
      console.error("spacewell::enDashes(): no content supplied.");
      return;
   }

   return content.replace(
      /(–|&ndash;|&8211;|&x2013;)/,
      `${NO_BREAK_NARROW_SP}${EN_DASH}${NO_BREAK_NARROW_SP}`
   );
}

// Take e.g. "J. R. R. Tolkien" or "J.R.R. Tolkien" and use thin spaces
// between the initials.
function initials(content) {
   if (!content) {
      console.error("spacewell::initials(): no content supplied.");
      return;
   }

   // TODO: implement this in a way that doesn't mistake ends of
   //     sentences. Basically, I *think* it should just be anytime
   //     that the period follows a capital letter, but there may be
   //     the occasional exception.
   console.error("spacewell::initials() not yet implemented.");
}

/**
  Given a valid DOM element `container`, apply nice typographical spacing.
  @param  {Object}   options           Options for which spacing rules to use.
  @param  {boolean}  options.emDashes  Wrap em dashes in hair spaces.
  @param  {boolean}  options.enDashes  Wrap em dashes in thin spaces.
  @param  {boolean}  options.initials  Separate initials with thin spaces.
  @param  {Node}     container         A document element to apply rules to.
 */
function spacewell(options, container) {
   // Curry the invocation for partial application.
   const run = _container => {
      if (!container.innerHTML) {
         console.error("spacewell: container is not a `Node`.");
         return;
      }

      // NOTE: keys are mapped to names of functions in the module.
      const defaultOpts = {
         emDashes: true,
         enDashes: true,
         initials: true,
         quotes: true
      };

      const config = options || defaultOpts;

      const functions = { emDashes, enDashes, initials, quotes };

      var content = _container.innerHTML;
      for (const opt in config) {
         if (config[opt]) {
            content = functions[opt](content);
         }
      }

      _container.innerHTML = content;
   };

   return !!container ? run(container) : run;
}

// Let the user import whatever they like.
export { spacewell, emDashes, enDashes, initials };

// But the default is just the main spacewell function.
export default spacewell;
