(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  function quotes(content) {
    if (!content) {
      console.error("`spacewell#quotes()`: no content supplied.");
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

  var THIN_SP = "&thinsp;";
  var HAIR_SP = "&hairsp;";
  var EM_DASH = "&mdash;";
  var EN_DASH = "&ndash;"; // Wrap em dashes and their immediate neighbors in non-breaking span and
  // hair spaces. Normalize which em dash variant is used.

  function emDashes(content) {
    if (!content) {
      console.error("`spacewell#emDashes()`: no content supplied.");
      return;
    }

    return content.replace(/(—|&mdash;|&#8212;|&x2014;)/g, "".concat(HAIR_SP).concat(EM_DASH).concat(HAIR_SP));
  } // Wrap en dashes and their immediate neighbors in non-breaking span and
  // thin spaces (for words, replacing normal spaces) or hair spaces (for
  // numbers). Normalize which en dash variant is used.


  function enDashes(content) {
    if (!content) {
      console.error("`spacewell#enDashes()`: no content supplied.");
      return;
    }

    var OPEN = "<dash-wrap>";
    var CLOSE = "</dash-wrap>"; // Do numbers first. Include a variety of ways digits might be constructed,
    // including e.g. Bible verses, other punctuation, etc.

    var numPatt = /([\d:\.]+) ?(–|&ndash;|&8211;|&x2013;) ?(\d+)/g;
    var wordPatt = /(\w+) ?(–|&ndash;|&8211;|&x2013;) ?(\w+)/g;
    var replacement = "".concat(OPEN, "$1").concat(THIN_SP).concat(EN_DASH).concat(THIN_SP, "$3").concat(CLOSE);
    return content.replace(numPatt, replacement).replace(wordPatt, replacement);
  } // Take e.g. "J. R. R. Tolkien" or "J.R.R. Tolkien" and use thin spaces
  // between the initials.


  function initials(content) {
    if (!content) {
      console.error("`spacewell#initials()`: no content supplied.");
      return;
    } // TODO: implement this in a way that doesn't mistake ends of
    //     sentences. Basically, I *think* it should just be anytime
    //     that the period follows a capital letter, but there may be
    //     the occasional exception.


    console.error("`spacewell#initials()` not yet implemented.");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlcyI6WyJ0aGVtZS9zY3JpcHRzL3NwYWNld2VsbC5qcyIsInRoZW1lL3NjcmlwdHMvbGliLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHF1b3Rlcyhjb250ZW50KSB7XG4gICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJgc3BhY2V3ZWxsI3F1b3RlcygpYDogbm8gY29udGVudCBzdXBwbGllZC5cIik7XG4gICAgICByZXR1cm47XG4gICB9XG5cbiAgIGNvbnN0IGRxdW9fcGF0dCA9IC8o4oCcfCZsZHF1bzt8JiM4MjIwOykvZztcbiAgIGNvbnN0IGRxdW9fcmVwbCA9IFwiPGRxdW8tcHVzaD48L2RxdW8tcHVzaD48ZHF1by1wdWxsPiAkMTwvZHF1by1wdWxsPlwiO1xuICAgY29uc3Qgc3F1b19wYXR0ID0gLyjigJh8JmxzcXVvO3wmIzgyMTY7KS9nO1xuICAgY29uc3Qgc3F1b19yZXBsID0gXCI8c3F1by1wdXNoPjwvc3F1by1wdXNoPjxzcXVvLXB1bGw+ICQxPC9zcXVvLXB1bGw+XCI7XG5cbiAgIGNvbnN0IGRxdW9fcHVsbGVkID0gY29udGVudC5yZXBsYWNlKGRxdW9fcGF0dCwgZHF1b19yZXBsKTtcbiAgIGNvbnN0IHNxdW9fcHVsbGVkID0gZHF1b19wdWxsZWQucmVwbGFjZShzcXVvX3BhdHQsIHNxdW9fcmVwbCk7XG4gICByZXR1cm4gc3F1b19wdWxsZWQ7XG59XG5cbmNvbnN0IFRISU5fU1AgPSBcIiZ0aGluc3A7XCI7XG5jb25zdCBIQUlSX1NQID0gXCImaGFpcnNwO1wiO1xuY29uc3QgRU1fREFTSCA9IFwiJm1kYXNoO1wiO1xuY29uc3QgRU5fREFTSCA9IFwiJm5kYXNoO1wiO1xuXG4vLyBXcmFwIGVtIGRhc2hlcyBhbmQgdGhlaXIgaW1tZWRpYXRlIG5laWdoYm9ycyBpbiBub24tYnJlYWtpbmcgc3BhbiBhbmRcbi8vIGhhaXIgc3BhY2VzLiBOb3JtYWxpemUgd2hpY2ggZW0gZGFzaCB2YXJpYW50IGlzIHVzZWQuXG5mdW5jdGlvbiBlbURhc2hlcyhjb250ZW50KSB7XG4gICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJgc3BhY2V3ZWxsI2VtRGFzaGVzKClgOiBubyBjb250ZW50IHN1cHBsaWVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgIH1cblxuICAgcmV0dXJuIGNvbnRlbnQucmVwbGFjZShcbiAgICAgIC8o4oCUfCZtZGFzaDt8JiM4MjEyO3wmeDIwMTQ7KS9nLFxuICAgICAgYCR7SEFJUl9TUH0ke0VNX0RBU0h9JHtIQUlSX1NQfWBcbiAgICk7XG59XG5cbi8vIFdyYXAgZW4gZGFzaGVzIGFuZCB0aGVpciBpbW1lZGlhdGUgbmVpZ2hib3JzIGluIG5vbi1icmVha2luZyBzcGFuIGFuZFxuLy8gdGhpbiBzcGFjZXMgKGZvciB3b3JkcywgcmVwbGFjaW5nIG5vcm1hbCBzcGFjZXMpIG9yIGhhaXIgc3BhY2VzIChmb3Jcbi8vIG51bWJlcnMpLiBOb3JtYWxpemUgd2hpY2ggZW4gZGFzaCB2YXJpYW50IGlzIHVzZWQuXG5mdW5jdGlvbiBlbkRhc2hlcyhjb250ZW50KSB7XG4gICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJgc3BhY2V3ZWxsI2VuRGFzaGVzKClgOiBubyBjb250ZW50IHN1cHBsaWVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgIH1cblxuICAgY29uc3QgT1BFTiA9IFwiPGRhc2gtd3JhcD5cIjtcbiAgIGNvbnN0IENMT1NFID0gXCI8L2Rhc2gtd3JhcD5cIjtcblxuICAgLy8gRG8gbnVtYmVycyBmaXJzdC4gSW5jbHVkZSBhIHZhcmlldHkgb2Ygd2F5cyBkaWdpdHMgbWlnaHQgYmUgY29uc3RydWN0ZWQsXG4gICAvLyBpbmNsdWRpbmcgZS5nLiBCaWJsZSB2ZXJzZXMsIG90aGVyIHB1bmN0dWF0aW9uLCBldGMuXG4gICBjb25zdCBudW1QYXR0ID0gLyhbXFxkOlxcLl0rKSA/KOKAk3wmbmRhc2g7fCY4MjExO3wmeDIwMTM7KSA/KFxcZCspL2c7XG4gICBjb25zdCB3b3JkUGF0dCA9IC8oXFx3KykgPyjigJN8Jm5kYXNoO3wmODIxMTt8JngyMDEzOykgPyhcXHcrKS9nO1xuICAgY29uc3QgcmVwbGFjZW1lbnQgPSBgJHtPUEVOfSQxJHtUSElOX1NQfSR7RU5fREFTSH0ke1RISU5fU1B9JDMke0NMT1NFfWA7XG5cbiAgIHJldHVybiBjb250ZW50LnJlcGxhY2UobnVtUGF0dCwgcmVwbGFjZW1lbnQpLnJlcGxhY2Uod29yZFBhdHQsIHJlcGxhY2VtZW50KTtcbn1cblxuLy8gVGFrZSBlLmcuIFwiSi4gUi4gUi4gVG9sa2llblwiIG9yIFwiSi5SLlIuIFRvbGtpZW5cIiBhbmQgdXNlIHRoaW4gc3BhY2VzXG4vLyBiZXR3ZWVuIHRoZSBpbml0aWFscy5cbmZ1bmN0aW9uIGluaXRpYWxzKGNvbnRlbnQpIHtcbiAgIGlmICghY29udGVudCkge1xuICAgICAgY29uc29sZS5lcnJvcihcImBzcGFjZXdlbGwjaW5pdGlhbHMoKWA6IG5vIGNvbnRlbnQgc3VwcGxpZWQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgfVxuXG4gICAvLyBUT0RPOiBpbXBsZW1lbnQgdGhpcyBpbiBhIHdheSB0aGF0IGRvZXNuJ3QgbWlzdGFrZSBlbmRzIG9mXG4gICAvLyAgICAgc2VudGVuY2VzLiBCYXNpY2FsbHksIEkgKnRoaW5rKiBpdCBzaG91bGQganVzdCBiZSBhbnl0aW1lXG4gICAvLyAgICAgdGhhdCB0aGUgcGVyaW9kIGZvbGxvd3MgYSBjYXBpdGFsIGxldHRlciwgYnV0IHRoZXJlIG1heSBiZVxuICAgLy8gICAgIHRoZSBvY2Nhc2lvbmFsIGV4Y2VwdGlvbi5cbiAgIGNvbnNvbGUuZXJyb3IoXCJgc3BhY2V3ZWxsI2luaXRpYWxzKClgIG5vdCB5ZXQgaW1wbGVtZW50ZWQuXCIpO1xufVxuXG4vKipcbiAgR2l2ZW4gYSB2YWxpZCBET00gZWxlbWVudCBgY29udGFpbmVyYCwgYXBwbHkgbmljZSB0eXBvZ3JhcGhpY2FsIHNwYWNpbmcuXG4gIEBwYXJhbSAge09iamVjdH0gICBvcHRpb25zICAgICAgICAgICBPcHRpb25zIGZvciB3aGljaCBzcGFjaW5nIHJ1bGVzIHRvIHVzZS5cbiAgQHBhcmFtICB7Ym9vbGVhbn0gIG9wdGlvbnMuZW1EYXNoZXMgIFdyYXAgZW0gZGFzaGVzIGluIGhhaXIgc3BhY2VzLlxuICBAcGFyYW0gIHtib29sZWFufSAgb3B0aW9ucy5lbkRhc2hlcyAgV3JhcCBlbSBkYXNoZXMgaW4gdGhpbiBzcGFjZXMuXG4gIEBwYXJhbSAge2Jvb2xlYW59ICBvcHRpb25zLmluaXRpYWxzICBTZXBhcmF0ZSBpbml0aWFscyB3aXRoIHRoaW4gc3BhY2VzLlxuICBAcGFyYW0gIHtOb2RlfSAgICAgY29udGFpbmVyICAgICAgICAgQSBkb2N1bWVudCBlbGVtZW50IHRvIGFwcGx5IHJ1bGVzIHRvLlxuICovXG5mdW5jdGlvbiBzcGFjZXdlbGwob3B0aW9ucywgY29udGFpbmVyKSB7XG4gICAvLyBDdXJyeSB0aGUgaW52b2NhdGlvbiBmb3IgcGFydGlhbCBhcHBsaWNhdGlvbi5cbiAgIGNvbnN0IHJ1biA9IF9jb250YWluZXIgPT4ge1xuICAgICAgaWYgKCFfY29udGFpbmVyLmlubmVySFRNTCkge1xuICAgICAgICAgY29uc29sZS5lcnJvcihcInNwYWNld2VsbDogY29udGFpbmVyIGlzIG5vdCBhIGBOb2RlYC5cIik7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIE5PVEU6IGtleXMgYXJlIG1hcHBlZCB0byBuYW1lcyBvZiBmdW5jdGlvbnMgaW4gdGhlIG1vZHVsZS5cbiAgICAgIGNvbnN0IGRlZmF1bHRPcHRzID0ge1xuICAgICAgICAgZW1EYXNoZXM6IHRydWUsXG4gICAgICAgICBlbkRhc2hlczogdHJ1ZSxcbiAgICAgICAgIGluaXRpYWxzOiB0cnVlLFxuICAgICAgICAgcXVvdGVzOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjb25maWcgPSBvcHRpb25zIHx8IGRlZmF1bHRPcHRzO1xuXG4gICAgICBjb25zdCBmdW5jdGlvbnMgPSB7IGVtRGFzaGVzLCBlbkRhc2hlcywgaW5pdGlhbHMsIHF1b3RlcyB9O1xuXG4gICAgICB2YXIgY29udGVudCA9IF9jb250YWluZXIuaW5uZXJIVE1MO1xuICAgICAgZm9yIChjb25zdCBvcHQgaW4gY29uZmlnKSB7XG4gICAgICAgICBpZiAoY29uZmlnW29wdF0pIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBmdW5jdGlvbnNbb3B0XShjb250ZW50KTtcbiAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgX2NvbnRhaW5lci5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgfTtcblxuICAgcmV0dXJuICEhY29udGFpbmVyID8gcnVuKGNvbnRhaW5lcikgOiBydW47XG59XG5cbi8vIExldCB0aGUgdXNlciBpbXBvcnQgd2hhdGV2ZXIgdGhleSBsaWtlLlxuZXhwb3J0IHsgc3BhY2V3ZWxsLCBlbURhc2hlcywgZW5EYXNoZXMsIGluaXRpYWxzIH07XG5cbi8vIEJ1dCB0aGUgZGVmYXVsdCBpcyBqdXN0IHRoZSBtYWluIHNwYWNld2VsbCBmdW5jdGlvbi5cbmV4cG9ydCBkZWZhdWx0IHNwYWNld2VsbDtcbiIsImltcG9ydCBzcGFjZXdlbGwgZnJvbSBcIi4vc3BhY2V3ZWxsXCI7XG4vLyBpbXBvcnQgc21jcCBmcm9tICdzY21wJztcblxuY29uc3QgcHJvY2VzcyA9IHNwYWNld2VsbCh7IGVtRGFzaGVzOiB0cnVlLCBlbkRhc2hlczogdHJ1ZSwgcXVvdGVzOiB0cnVlIH0pO1xuZm9yIChjb25zdCBhcnRpY2xlIG9mIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYXJ0aWNsZVwiKSkge1xuICAgcHJvY2VzcyhhcnRpY2xlKTtcbn1cbiJdLCJuYW1lcyI6WyJxdW90ZXMiLCJjb250ZW50IiwiY29uc29sZSIsImVycm9yIiwiZHF1b19wYXR0IiwiZHF1b19yZXBsIiwic3F1b19wYXR0Iiwic3F1b19yZXBsIiwiZHF1b19wdWxsZWQiLCJyZXBsYWNlIiwic3F1b19wdWxsZWQiLCJUSElOX1NQIiwiSEFJUl9TUCIsIkVNX0RBU0giLCJFTl9EQVNIIiwiZW1EYXNoZXMiLCJlbkRhc2hlcyIsIk9QRU4iLCJDTE9TRSIsIm51bVBhdHQiLCJ3b3JkUGF0dCIsInJlcGxhY2VtZW50IiwiaW5pdGlhbHMiLCJzcGFjZXdlbGwiLCJvcHRpb25zIiwiY29udGFpbmVyIiwicnVuIiwiX2NvbnRhaW5lciIsImlubmVySFRNTCIsImRlZmF1bHRPcHRzIiwiY29uZmlnIiwiZnVuY3Rpb25zIiwib3B0IiwicHJvY2VzcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhcnRpY2xlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7RUFBQSxTQUFTQSxNQUFULENBQWdCQyxPQUFoQixFQUF5QjtFQUN0QixNQUFJLENBQUNBLE9BQUwsRUFBYztFQUNYQyxJQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyw0Q0FBZDtFQUNBO0VBQ0Y7O0VBRUQsTUFBTUMsU0FBUyxHQUFHLHNCQUFsQjtFQUNBLE1BQU1DLFNBQVMsR0FBRyxtREFBbEI7RUFDQSxNQUFNQyxTQUFTLEdBQUcsc0JBQWxCO0VBQ0EsTUFBTUMsU0FBUyxHQUFHLG1EQUFsQjtFQUVBLE1BQU1DLFdBQVcsR0FBR1AsT0FBTyxDQUFDUSxPQUFSLENBQWdCTCxTQUFoQixFQUEyQkMsU0FBM0IsQ0FBcEI7RUFDQSxNQUFNSyxXQUFXLEdBQUdGLFdBQVcsQ0FBQ0MsT0FBWixDQUFvQkgsU0FBcEIsRUFBK0JDLFNBQS9CLENBQXBCO0VBQ0EsU0FBT0csV0FBUDtFQUNGOztFQUVELElBQU1DLE9BQU8sR0FBRyxVQUFoQjtFQUNBLElBQU1DLE9BQU8sR0FBRyxVQUFoQjtFQUNBLElBQU1DLE9BQU8sR0FBRyxTQUFoQjtFQUNBLElBQU1DLE9BQU8sR0FBRyxTQUFoQjtFQUdBOztFQUNBLFNBQVNDLFFBQVQsQ0FBa0JkLE9BQWxCLEVBQTJCO0VBQ3hCLE1BQUksQ0FBQ0EsT0FBTCxFQUFjO0VBQ1hDLElBQUFBLE9BQU8sQ0FBQ0MsS0FB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
