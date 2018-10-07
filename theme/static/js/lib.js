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
      if (!_container.innerHTML) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlcyI6WyJ0aGVtZS9zY3JpcHRzL3NwYWNld2VsbC5qcyIsInRoZW1lL3NjcmlwdHMvbGliLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHF1b3Rlcyhjb250ZW50KSB7XG4gICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJzcGFjZXdlbGw6OnF1b3RlcygpOiBubyBjb250ZW50IHN1cHBsaWVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgIH1cblxuICAgY29uc3QgZHF1b19wYXR0ID0gLyjigJx8JmxkcXVvO3wmIzgyMjA7KS9nO1xuICAgY29uc3QgZHF1b19yZXBsID0gXCI8ZHF1by1wdXNoPjwvZHF1by1wdXNoPjxkcXVvLXB1bGw+ICQxPC9kcXVvLXB1bGw+XCI7XG4gICBjb25zdCBzcXVvX3BhdHQgPSAvKOKAmHwmbHNxdW87fCYjODIxNjspL2c7XG4gICBjb25zdCBzcXVvX3JlcGwgPSBcIjxzcXVvLXB1c2g+PC9zcXVvLXB1c2g+PHNxdW8tcHVsbD4gJDE8L3NxdW8tcHVsbD5cIjtcblxuICAgY29uc3QgZHF1b19wdWxsZWQgPSBjb250ZW50LnJlcGxhY2UoZHF1b19wYXR0LCBkcXVvX3JlcGwpO1xuICAgY29uc3Qgc3F1b19wdWxsZWQgPSBkcXVvX3B1bGxlZC5yZXBsYWNlKHNxdW9fcGF0dCwgc3F1b19yZXBsKTtcbiAgIHJldHVybiBzcXVvX3B1bGxlZDtcbn1cblxuY29uc3QgTk9fQlJFQUtfTkFSUk9XX1NQID0gXCImIzgyMzk7XCI7XG5jb25zdCBIQUlSX1NQID0gXCImaGFpcnNwXCI7XG5jb25zdCBFTV9EQVNIID0gXCImbWRhc2g7XCI7XG5jb25zdCBFTl9EQVNIID0gXCImbmRhc2hcIjtcblxuLy8gV3JhcCBlbSBkYXNoZXMgYW5kIHRoZWlyIGltbWVkaWF0ZSBuZWlnaGJvcnMgaW4gbm9uLWJyZWFraW5nIHNwYW4gYW5kXG4vLyBoYWlyIHNwYWNlcy4gTm9ybWFsaXplIHdoaWNoIGVtIGRhc2ggdmFyaWFudCBpcyB1c2VkLlxuZnVuY3Rpb24gZW1EYXNoZXMoY29udGVudCkge1xuICAgaWYgKCFjb250ZW50KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwic3BhY2V3ZWxsOjplbURhc2hlcygpOiBubyBjb250ZW50IHN1cHBsaWVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgIH1cblxuICAgcmV0dXJuIGNvbnRlbnQucmVwbGFjZShcbiAgICAgIC8o4oCUfCZtZGFzaDt8JiM4MjEyO3wmeDIwMTQ7KS8sXG4gICAgICBgJHtIQUlSX1NQfSR7RU1fREFTSH0ke0hBSVJfU1B9YFxuICAgKTtcbn1cblxuLy8gV3JhcCBlbiBkYXNoZXMgYW5kIHRoZWlyIGltbWVkaWF0ZSBuZWlnaGJvcnMgaW4gbm9uLWJyZWFraW5nIHNwYW4gYW5kXG4vLyB0aGluIHNwYWNlcyAoZm9yIHdvcmRzLCByZXBsYWNpbmcgbm9ybWFsIHNwYWNlcykgb3IgaGFpciBzcGFjZXMgKGZvclxuLy8gbnVtYmVycykuIE5vcm1hbGl6ZSB3aGljaCBlbiBkYXNoIHZhcmlhbnQgaXMgdXNlZC5cbmZ1bmN0aW9uIGVuRGFzaGVzKGNvbnRlbnQpIHtcbiAgIGlmICghY29udGVudCkge1xuICAgICAgY29uc29sZS5lcnJvcihcInNwYWNld2VsbDo6ZW5EYXNoZXMoKTogbm8gY29udGVudCBzdXBwbGllZC5cIik7XG4gICAgICByZXR1cm47XG4gICB9XG5cbiAgIHJldHVybiBjb250ZW50LnJlcGxhY2UoXG4gICAgICAvKOKAk3wmbmRhc2g7fCY4MjExO3wmeDIwMTM7KS8sXG4gICAgICBgJHtOT19CUkVBS19OQVJST1dfU1B9JHtFTl9EQVNIfSR7Tk9fQlJFQUtfTkFSUk9XX1NQfWBcbiAgICk7XG59XG5cbi8vIFRha2UgZS5nLiBcIkouIFIuIFIuIFRvbGtpZW5cIiBvciBcIkouUi5SLiBUb2xraWVuXCIgYW5kIHVzZSB0aGluIHNwYWNlc1xuLy8gYmV0d2VlbiB0aGUgaW5pdGlhbHMuXG5mdW5jdGlvbiBpbml0aWFscyhjb250ZW50KSB7XG4gICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJzcGFjZXdlbGw6OmluaXRpYWxzKCk6IG5vIGNvbnRlbnQgc3VwcGxpZWQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgfVxuXG4gICAvLyBUT0RPOiBpbXBsZW1lbnQgdGhpcyBpbiBhIHdheSB0aGF0IGRvZXNuJ3QgbWlzdGFrZSBlbmRzIG9mXG4gICAvLyAgICAgc2VudGVuY2VzLiBCYXNpY2FsbHksIEkgKnRoaW5rKiBpdCBzaG91bGQganVzdCBiZSBhbnl0aW1lXG4gICAvLyAgICAgdGhhdCB0aGUgcGVyaW9kIGZvbGxvd3MgYSBjYXBpdGFsIGxldHRlciwgYnV0IHRoZXJlIG1heSBiZVxuICAgLy8gICAgIHRoZSBvY2Nhc2lvbmFsIGV4Y2VwdGlvbi5cbiAgIGNvbnNvbGUuZXJyb3IoXCJzcGFjZXdlbGw6OmluaXRpYWxzKCkgbm90IHlldCBpbXBsZW1lbnRlZC5cIik7XG59XG5cbi8qKlxuICBHaXZlbiBhIHZhbGlkIERPTSBlbGVtZW50IGBjb250YWluZXJgLCBhcHBseSBuaWNlIHR5cG9ncmFwaGljYWwgc3BhY2luZy5cbiAgQHBhcmFtICB7T2JqZWN0fSAgIG9wdGlvbnMgICAgICAgICAgIE9wdGlvbnMgZm9yIHdoaWNoIHNwYWNpbmcgcnVsZXMgdG8gdXNlLlxuICBAcGFyYW0gIHtib29sZWFufSAgb3B0aW9ucy5lbURhc2hlcyAgV3JhcCBlbSBkYXNoZXMgaW4gaGFpciBzcGFjZXMuXG4gIEBwYXJhbSAge2Jvb2xlYW59ICBvcHRpb25zLmVuRGFzaGVzICBXcmFwIGVtIGRhc2hlcyBpbiB0aGluIHNwYWNlcy5cbiAgQHBhcmFtICB7Ym9vbGVhbn0gIG9wdGlvbnMuaW5pdGlhbHMgIFNlcGFyYXRlIGluaXRpYWxzIHdpdGggdGhpbiBzcGFjZXMuXG4gIEBwYXJhbSAge05vZGV9ICAgICBjb250YWluZXIgICAgICAgICBBIGRvY3VtZW50IGVsZW1lbnQgdG8gYXBwbHkgcnVsZXMgdG8uXG4gKi9cbmZ1bmN0aW9uIHNwYWNld2VsbChvcHRpb25zLCBjb250YWluZXIpIHtcbiAgIC8vIEN1cnJ5IHRoZSBpbnZvY2F0aW9uIGZvciBwYXJ0aWFsIGFwcGxpY2F0aW9uLlxuICAgY29uc3QgcnVuID0gX2NvbnRhaW5lciA9PiB7XG4gICAgICBpZiAoIV9jb250YWluZXIuaW5uZXJIVE1MKSB7XG4gICAgICAgICBjb25zb2xlLmVycm9yKFwic3BhY2V3ZWxsOiBjb250YWluZXIgaXMgbm90IGEgYE5vZGVgLlwiKTtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTk9URToga2V5cyBhcmUgbWFwcGVkIHRvIG5hbWVzIG9mIGZ1bmN0aW9ucyBpbiB0aGUgbW9kdWxlLlxuICAgICAgY29uc3QgZGVmYXVsdE9wdHMgPSB7XG4gICAgICAgICBlbURhc2hlczogdHJ1ZSxcbiAgICAgICAgIGVuRGFzaGVzOiB0cnVlLFxuICAgICAgICAgaW5pdGlhbHM6IHRydWUsXG4gICAgICAgICBxdW90ZXM6IHRydWVcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNvbmZpZyA9IG9wdGlvbnMgfHwgZGVmYXVsdE9wdHM7XG5cbiAgICAgIGNvbnN0IGZ1bmN0aW9ucyA9IHsgZW1EYXNoZXMsIGVuRGFzaGVzLCBpbml0aWFscywgcXVvdGVzIH07XG5cbiAgICAgIHZhciBjb250ZW50ID0gX2NvbnRhaW5lci5pbm5lckhUTUw7XG4gICAgICBmb3IgKGNvbnN0IG9wdCBpbiBjb25maWcpIHtcbiAgICAgICAgIGlmIChjb25maWdbb3B0XSkge1xuICAgICAgICAgICAgY29udGVudCA9IGZ1bmN0aW9uc1tvcHRdKGNvbnRlbnQpO1xuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfY29udGFpbmVyLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICB9O1xuXG4gICByZXR1cm4gISFjb250YWluZXIgPyBydW4oY29udGFpbmVyKSA6IHJ1bjtcbn1cblxuLy8gTGV0IHRoZSB1c2VyIGltcG9ydCB3aGF0ZXZlciB0aGV5IGxpa2UuXG5leHBvcnQgeyBzcGFjZXdlbGwsIGVtRGFzaGVzLCBlbkRhc2hlcywgaW5pdGlhbHMgfTtcblxuLy8gQnV0IHRoZSBkZWZhdWx0IGlzIGp1c3QgdGhlIG1haW4gc3BhY2V3ZWxsIGZ1bmN0aW9uLlxuZXhwb3J0IGRlZmF1bHQgc3BhY2V3ZWxsO1xuIiwiaW1wb3J0IHNwYWNld2VsbCBmcm9tIFwiLi9zcGFjZXdlbGxcIjtcbi8vIGltcG9ydCBzbWNwIGZyb20gJ3NjbXAnO1xuXG5jb25zdCBwcm9jZXNzID0gc3BhY2V3ZWxsKHsgZW1EYXNoZXM6IHRydWUsIGVuRGFzaGVzOiB0cnVlLCBxdW90ZXM6IHRydWUgfSk7XG5mb3IgKGNvbnN0IGFydGljbGUgb2YgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJhcnRpY2xlXCIpKSB7XG4gICBwcm9jZXNzKGFydGljbGUpO1xufVxuIl0sIm5hbWVzIjpbInF1b3RlcyIsImNvbnRlbnQiLCJjb25zb2xlIiwiZXJyb3IiLCJkcXVvX3BhdHQiLCJkcXVvX3JlcGwiLCJzcXVvX3BhdHQiLCJzcXVvX3JlcGwiLCJkcXVvX3B1bGxlZCIsInJlcGxhY2UiLCJzcXVvX3B1bGxlZCIsIk5PX0JSRUFLX05BUlJPV19TUCIsIkhBSVJfU1AiLCJFTV9EQVNIIiwiRU5fREFTSCIsImVtRGFzaGVzIiwiZW5EYXNoZXMiLCJpbml0aWFscyIsInNwYWNld2VsbCIsIm9wdGlvbnMiLCJjb250YWluZXIiLCJydW4iLCJfY29udGFpbmVyIiwiaW5uZXJIVE1MIiwiZGVmYXVsdE9wdHMiLCJjb25maWciLCJmdW5jdGlvbnMiLCJvcHQiLCJwcm9jZXNzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFydGljbGUiXSwibWFwcGluZ3MiOiI7Ozs7OztFQUFBLFNBQVNBLE1BQVQsQ0FBZ0JDLE9BQWhCLEVBQXlCO0VBQ3RCLE1BQUksQ0FBQ0EsT0FBTCxFQUFjO0VBQ1hDLElBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDJDQUFkO0VBQ0E7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
