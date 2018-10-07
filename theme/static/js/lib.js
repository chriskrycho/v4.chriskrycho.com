(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  function quotes(content) {
    if (!content) {
      console.error("spacewell::quotes(): no content supplied.");
      return;
    }

    var dquo_patt = /(“|&ldquo;|&#8220;)/g;
    var dquo_repl = "<dquo-push></dquo-push><dquo-pull> $1</dquo-pull>";
    var squo_patt = /(‘|&lsquo;|&#8216;)/g;
    var squo_repl = "<squo-push></squo-push><squo-pull> $1</squo-pull>";
    var dquo_pulled = content.replace(dquo_patt, dquo_repl);
    var squo_pulled = dquo_pulled.replace(squo_patt, squo_repl);
    return squo_pulled;
  }

  var NO_BREAK_NARROW_SP = "&#8239;";
  var HAIR_SP = "&hairsp";
  var EM_DASH = "&mdash;";
  var EN_DASH = "&ndash"; // Wrap em dashes and their immediate neighbors in non-breaking span and
  // hair spaces. Normalize which em dash variant is used.

  function emDashes(content) {
    if (!content) {
      console.error("spacewell::emDashes(): no content supplied.");
      return;
    }

    return content.replace(/(—|&mdash;|&#8212;|&x2014;)/, "".concat(HAIR_SP).concat(EM_DASH).concat(HAIR_SP));
  } // Wrap en dashes and their immediate neighbors in non-breaking span and
  // thin spaces (for words, replacing normal spaces) or hair spaces (for
  // numbers). Normalize which en dash variant is used.


  function enDashes(content) {
    if (!content) {
      console.error("spacewell::enDashes(): no content supplied.");
      return;
    }

    return content.replace(/(–|&ndash;|&8211;|&x2013;)/, "".concat(NO_BREAK_NARROW_SP).concat(EN_DASH).concat(NO_BREAK_NARROW_SP));
  } // Take e.g. "J. R. R. Tolkien" or "J.R.R. Tolkien" and use thin spaces
  // between the initials.


  function initials(content) {
    if (!content) {
      console.error("spacewell::initials(): no content supplied.");
      return;
    } // TODO: implement this in a way that doesn't mistake ends of
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
    var run = function run(_container) {
      if (!container.innerHTML) {
        console.error("spacewell: container is not a `Node`.");
        return;
      } // NOTE: keys are mapped to names of functions in the module.


      var defaultOpts = {
        emDashes: true,
        enDashes: true,
        initials: true,
        quotes: true
      };
      var config = options || defaultOpts;
      var functions = {
        emDashes: emDashes,
        enDashes: enDashes,
        initials: initials,
        quotes: quotes
      };
      var content = _container.innerHTML;

      for (var opt in config) {
        if (config[opt]) {
          content = functions[opt](content);
        }
      }

      _container.innerHTML = content;
    };

    return !!container ? run(container) : run;
  } // Let the user import whatever they like.

  var process = spacewell({
    emDashes: true,
    enDashes: true,
    quotes: true
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = document.getElementsByTagName("article")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var article = _step.value;
      process(article);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlcyI6WyJ0aGVtZS9zY3JpcHRzL3NwYWNld2VsbC5qcyIsInRoZW1lL3NjcmlwdHMvbGliLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHF1b3Rlcyhjb250ZW50KSB7XG4gICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJzcGFjZXdlbGw6OnF1b3RlcygpOiBubyBjb250ZW50IHN1cHBsaWVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgIH1cblxuICAgY29uc3QgZHF1b19wYXR0ID0gLyjigJx8JmxkcXVvO3wmIzgyMjA7KS9nO1xuICAgY29uc3QgZHF1b19yZXBsID0gXCI8ZHF1by1wdXNoPjwvZHF1by1wdXNoPjxkcXVvLXB1bGw+ICQxPC9kcXVvLXB1bGw+XCI7XG4gICBjb25zdCBzcXVvX3BhdHQgPSAvKOKAmHwmbHNxdW87fCYjODIxNjspL2c7XG4gICBjb25zdCBzcXVvX3JlcGwgPSBcIjxzcXVvLXB1c2g+PC9zcXVvLXB1c2g+PHNxdW8tcHVsbD4gJDE8L3NxdW8tcHVsbD5cIjtcblxuICAgY29uc3QgZHF1b19wdWxsZWQgPSBjb250ZW50LnJlcGxhY2UoZHF1b19wYXR0LCBkcXVvX3JlcGwpO1xuICAgY29uc3Qgc3F1b19wdWxsZWQgPSBkcXVvX3B1bGxlZC5yZXBsYWNlKHNxdW9fcGF0dCwgc3F1b19yZXBsKTtcbiAgIHJldHVybiBzcXVvX3B1bGxlZDtcbn1cblxuY29uc3QgTk9fQlJFQUtfTkFSUk9XX1NQID0gXCImIzgyMzk7XCI7XG5jb25zdCBIQUlSX1NQID0gXCImaGFpcnNwXCI7XG5jb25zdCBFTV9EQVNIID0gXCImbWRhc2g7XCI7XG5jb25zdCBFTl9EQVNIID0gXCImbmRhc2hcIjtcblxuLy8gV3JhcCBlbSBkYXNoZXMgYW5kIHRoZWlyIGltbWVkaWF0ZSBuZWlnaGJvcnMgaW4gbm9uLWJyZWFraW5nIHNwYW4gYW5kXG4vLyBoYWlyIHNwYWNlcy4gTm9ybWFsaXplIHdoaWNoIGVtIGRhc2ggdmFyaWFudCBpcyB1c2VkLlxuZnVuY3Rpb24gZW1EYXNoZXMoY29udGVudCkge1xuICAgaWYgKCFjb250ZW50KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwic3BhY2V3ZWxsOjplbURhc2hlcygpOiBubyBjb250ZW50IHN1cHBsaWVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgIH1cblxuICAgcmV0dXJuIGNvbnRlbnQucmVwbGFjZShcbiAgICAgIC8o4oCUfCZtZGFzaDt8JiM4MjEyO3wmeDIwMTQ7KS8sXG4gICAgICBgJHtIQUlSX1NQfSR7RU1fREFTSH0ke0hBSVJfU1B9YFxuICAgKTtcbn1cblxuLy8gV3JhcCBlbiBkYXNoZXMgYW5kIHRoZWlyIGltbWVkaWF0ZSBuZWlnaGJvcnMgaW4gbm9uLWJyZWFraW5nIHNwYW4gYW5kXG4vLyB0aGluIHNwYWNlcyAoZm9yIHdvcmRzLCByZXBsYWNpbmcgbm9ybWFsIHNwYWNlcykgb3IgaGFpciBzcGFjZXMgKGZvclxuLy8gbnVtYmVycykuIE5vcm1hbGl6ZSB3aGljaCBlbiBkYXNoIHZhcmlhbnQgaXMgdXNlZC5cbmZ1bmN0aW9uIGVuRGFzaGVzKGNvbnRlbnQpIHtcbiAgIGlmICghY29udGVudCkge1xuICAgICAgY29uc29sZS5lcnJvcihcInNwYWNld2VsbDo6ZW5EYXNoZXMoKTogbm8gY29udGVudCBzdXBwbGllZC5cIik7XG4gICAgICByZXR1cm47XG4gICB9XG5cbiAgIHJldHVybiBjb250ZW50LnJlcGxhY2UoXG4gICAgICAvKOKAk3wmbmRhc2g7fCY4MjExO3wmeDIwMTM7KS8sXG4gICAgICBgJHtOT19CUkVBS19OQVJST1dfU1B9JHtFTl9EQVNIfSR7Tk9fQlJFQUtfTkFSUk9XX1NQfWBcbiAgICk7XG59XG5cbi8vIFRha2UgZS5nLiBcIkouIFIuIFIuIFRvbGtpZW5cIiBvciBcIkouUi5SLiBUb2xraWVuXCIgYW5kIHVzZSB0aGluIHNwYWNlc1xuLy8gYmV0d2VlbiB0aGUgaW5pdGlhbHMuXG5mdW5jdGlvbiBpbml0aWFscyhjb250ZW50KSB7XG4gICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJzcGFjZXdlbGw6OmluaXRpYWxzKCk6IG5vIGNvbnRlbnQgc3VwcGxpZWQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgfVxuXG4gICAvLyBUT0RPOiBpbXBsZW1lbnQgdGhpcyBpbiBhIHdheSB0aGF0IGRvZXNuJ3QgbWlzdGFrZSBlbmRzIG9mXG4gICAvLyAgICAgc2VudGVuY2VzLiBCYXNpY2FsbHksIEkgKnRoaW5rKiBpdCBzaG91bGQganVzdCBiZSBhbnl0aW1lXG4gICAvLyAgICAgdGhhdCB0aGUgcGVyaW9kIGZvbGxvd3MgYSBjYXBpdGFsIGxldHRlciwgYnV0IHRoZXJlIG1heSBiZVxuICAgLy8gICAgIHRoZSBvY2Nhc2lvbmFsIGV4Y2VwdGlvbi5cbiAgIGNvbnNvbGUuZXJyb3IoXCJzcGFjZXdlbGw6OmluaXRpYWxzKCkgbm90IHlldCBpbXBsZW1lbnRlZC5cIik7XG59XG5cbi8qKlxuICBHaXZlbiBhIHZhbGlkIERPTSBlbGVtZW50IGBjb250YWluZXJgLCBhcHBseSBuaWNlIHR5cG9ncmFwaGljYWwgc3BhY2luZy5cbiAgQHBhcmFtICB7T2JqZWN0fSAgIG9wdGlvbnMgICAgICAgICAgIE9wdGlvbnMgZm9yIHdoaWNoIHNwYWNpbmcgcnVsZXMgdG8gdXNlLlxuICBAcGFyYW0gIHtib29sZWFufSAgb3B0aW9ucy5lbURhc2hlcyAgV3JhcCBlbSBkYXNoZXMgaW4gaGFpciBzcGFjZXMuXG4gIEBwYXJhbSAge2Jvb2xlYW59ICBvcHRpb25zLmVuRGFzaGVzICBXcmFwIGVtIGRhc2hlcyBpbiB0aGluIHNwYWNlcy5cbiAgQHBhcmFtICB7Ym9vbGVhbn0gIG9wdGlvbnMuaW5pdGlhbHMgIFNlcGFyYXRlIGluaXRpYWxzIHdpdGggdGhpbiBzcGFjZXMuXG4gIEBwYXJhbSAge05vZGV9ICAgICBjb250YWluZXIgICAgICAgICBBIGRvY3VtZW50IGVsZW1lbnQgdG8gYXBwbHkgcnVsZXMgdG8uXG4gKi9cbmZ1bmN0aW9uIHNwYWNld2VsbChvcHRpb25zLCBjb250YWluZXIpIHtcbiAgIC8vIEN1cnJ5IHRoZSBpbnZvY2F0aW9uIGZvciBwYXJ0aWFsIGFwcGxpY2F0aW9uLlxuICAgY29uc3QgcnVuID0gX2NvbnRhaW5lciA9PiB7XG4gICAgICBpZiAoIWNvbnRhaW5lci5pbm5lckhUTUwpIHtcbiAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzcGFjZXdlbGw6IGNvbnRhaW5lciBpcyBub3QgYSBgTm9kZWAuXCIpO1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBOT1RFOiBrZXlzIGFyZSBtYXBwZWQgdG8gbmFtZXMgb2YgZnVuY3Rpb25zIGluIHRoZSBtb2R1bGUuXG4gICAgICBjb25zdCBkZWZhdWx0T3B0cyA9IHtcbiAgICAgICAgIGVtRGFzaGVzOiB0cnVlLFxuICAgICAgICAgZW5EYXNoZXM6IHRydWUsXG4gICAgICAgICBpbml0aWFsczogdHJ1ZSxcbiAgICAgICAgIHF1b3RlczogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgY29uc3QgY29uZmlnID0gb3B0aW9ucyB8fCBkZWZhdWx0T3B0cztcblxuICAgICAgY29uc3QgZnVuY3Rpb25zID0geyBlbURhc2hlcywgZW5EYXNoZXMsIGluaXRpYWxzLCBxdW90ZXMgfTtcblxuICAgICAgdmFyIGNvbnRlbnQgPSBfY29udGFpbmVyLmlubmVySFRNTDtcbiAgICAgIGZvciAoY29uc3Qgb3B0IGluIGNvbmZpZykge1xuICAgICAgICAgaWYgKGNvbmZpZ1tvcHRdKSB7XG4gICAgICAgICAgICBjb250ZW50ID0gZnVuY3Rpb25zW29wdF0oY29udGVudCk7XG4gICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIF9jb250YWluZXIuaW5uZXJIVE1MID0gY29udGVudDtcbiAgIH07XG5cbiAgIHJldHVybiAhIWNvbnRhaW5lciA/IHJ1bihjb250YWluZXIpIDogcnVuO1xufVxuXG4vLyBMZXQgdGhlIHVzZXIgaW1wb3J0IHdoYXRldmVyIHRoZXkgbGlrZS5cbmV4cG9ydCB7IHNwYWNld2VsbCwgZW1EYXNoZXMsIGVuRGFzaGVzLCBpbml0aWFscyB9O1xuXG4vLyBCdXQgdGhlIGRlZmF1bHQgaXMganVzdCB0aGUgbWFpbiBzcGFjZXdlbGwgZnVuY3Rpb24uXG5leHBvcnQgZGVmYXVsdCBzcGFjZXdlbGw7XG4iLCJpbXBvcnQgc3BhY2V3ZWxsIGZyb20gXCIuL3NwYWNld2VsbFwiO1xuLy8gaW1wb3J0IHNtY3AgZnJvbSAnc2NtcCc7XG5cbmNvbnN0IHByb2Nlc3MgPSBzcGFjZXdlbGwoeyBlbURhc2hlczogdHJ1ZSwgZW5EYXNoZXM6IHRydWUsIHF1b3RlczogdHJ1ZSB9KTtcbmZvciAoY29uc3QgYXJ0aWNsZSBvZiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImFydGljbGVcIikpIHtcbiAgIHByb2Nlc3MoYXJ0aWNsZSk7XG59XG4iXSwibmFtZXMiOlsicXVvdGVzIiwiY29udGVudCIsImNvbnNvbGUiLCJlcnJvciIsImRxdW9fcGF0dCIsImRxdW9fcmVwbCIsInNxdW9fcGF0dCIsInNxdW9fcmVwbCIsImRxdW9fcHVsbGVkIiwicmVwbGFjZSIsInNxdW9fcHVsbGVkIiwiTk9fQlJFQUtfTkFSUk9XX1NQIiwiSEFJUl9TUCIsIkVNX0RBU0giLCJFTl9EQVNIIiwiZW1EYXNoZXMiLCJlbkRhc2hlcyIsImluaXRpYWxzIiwic3BhY2V3ZWxsIiwib3B0aW9ucyIsImNvbnRhaW5lciIsInJ1biIsIl9jb250YWluZXIiLCJpbm5lckhUTUwiLCJkZWZhdWx0T3B0cyIsImNvbmZpZyIsImZ1bmN0aW9ucyIsIm9wdCIsInByb2Nlc3MiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXJ0aWNsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0VBQUEsU0FBU0EsTUFBVCxDQUFnQkMsT0FBaEIsRUFBeUI7RUFDdEIsTUFBSSxDQUFDQSxPQUFMLEVBQWM7RUFDWEMsSUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsMkNBQWQ7RUFDQTtF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
