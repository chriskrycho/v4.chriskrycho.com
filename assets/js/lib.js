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
    var punct_quo_patt = /(\.|,)(”|&rdquo;|&#x0201D;|&#8221;|’|&rsquo;|&#x02019;|&#8217;)/g;
    var punct_quo_repl = "$1<punct-quo>$2</punct-quo>";
    return content.replace(dquo_patt, dquo_repl).replace(squo_patt, squo_repl).replace(punct_quo_patt, punct_quo_repl);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlcyI6WyJ0aGVtZS9zY3JpcHRzL3NwYWNld2VsbC5qcyIsInRoZW1lL3NjcmlwdHMvbGliLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHF1b3Rlcyhjb250ZW50KSB7XG4gICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJgc3BhY2V3ZWxsI3F1b3RlcygpYDogbm8gY29udGVudCBzdXBwbGllZC5cIik7XG4gICAgICByZXR1cm47XG4gICB9XG5cbiAgIGNvbnN0IGRxdW9fcGF0dCA9IC8o4oCcfCZsZHF1bzt8JiM4MjIwOykvZztcbiAgIGNvbnN0IGRxdW9fcmVwbCA9IFwiPGRxdW8tcHVzaD48L2RxdW8tcHVzaD48ZHF1by1wdWxsPiAkMTwvZHF1by1wdWxsPlwiO1xuXG4gICBjb25zdCBzcXVvX3BhdHQgPSAvKOKAmHwmbHNxdW87fCYjODIxNjspL2c7XG4gICBjb25zdCBzcXVvX3JlcGwgPSBcIjxzcXVvLXB1c2g+PC9zcXVvLXB1c2g+PHNxdW8tcHVsbD4gJDE8L3NxdW8tcHVsbD5cIjtcblxuICAgY29uc3QgcHVuY3RfcXVvX3BhdHQgPSAvKFxcLnwsKSjigJ18JnJkcXVvO3wmI3gwMjAxRDt8JiM4MjIxO3zigJl8JnJzcXVvO3wmI3gwMjAxOTt8JiM4MjE3OykvZztcbiAgIGNvbnN0IHB1bmN0X3F1b19yZXBsID0gXCIkMTxwdW5jdC1xdW8+JDI8L3B1bmN0LXF1bz5cIjtcblxuICAgcmV0dXJuIGNvbnRlbnRcbiAgICAgIC5yZXBsYWNlKGRxdW9fcGF0dCwgZHF1b19yZXBsKVxuICAgICAgLnJlcGxhY2Uoc3F1b19wYXR0LCBzcXVvX3JlcGwpXG4gICAgICAucmVwbGFjZShwdW5jdF9xdW9fcGF0dCwgcHVuY3RfcXVvX3JlcGwpO1xufVxuXG5jb25zdCBUSElOX1NQID0gXCImdGhpbnNwO1wiO1xuY29uc3QgSEFJUl9TUCA9IFwiJmhhaXJzcDtcIjtcbmNvbnN0IEVNX0RBU0ggPSBcIiZtZGFzaDtcIjtcbmNvbnN0IEVOX0RBU0ggPSBcIiZuZGFzaDtcIjtcblxuLy8gV3JhcCBlbSBkYXNoZXMgYW5kIHRoZWlyIGltbWVkaWF0ZSBuZWlnaGJvcnMgaW4gbm9uLWJyZWFraW5nIHNwYW4gYW5kXG4vLyBoYWlyIHNwYWNlcy4gTm9ybWFsaXplIHdoaWNoIGVtIGRhc2ggdmFyaWFudCBpcyB1c2VkLlxuZnVuY3Rpb24gZW1EYXNoZXMoY29udGVudCkge1xuICAgaWYgKCFjb250ZW50KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiYHNwYWNld2VsbCNlbURhc2hlcygpYDogbm8gY29udGVudCBzdXBwbGllZC5cIik7XG4gICAgICByZXR1cm47XG4gICB9XG5cbiAgIHJldHVybiBjb250ZW50LnJlcGxhY2UoXG4gICAgICAvKOKAlHwmbWRhc2g7fCYjODIxMjt8JngyMDE0OykvZyxcbiAgICAgIGAke0hBSVJfU1B9JHtFTV9EQVNIfSR7SEFJUl9TUH1gXG4gICApO1xufVxuXG4vLyBXcmFwIGVuIGRhc2hlcyBhbmQgdGhlaXIgaW1tZWRpYXRlIG5laWdoYm9ycyBpbiBub24tYnJlYWtpbmcgc3BhbiBhbmRcbi8vIHRoaW4gc3BhY2VzIChmb3Igd29yZHMsIHJlcGxhY2luZyBub3JtYWwgc3BhY2VzKSBvciBoYWlyIHNwYWNlcyAoZm9yXG4vLyBudW1iZXJzKS4gTm9ybWFsaXplIHdoaWNoIGVuIGRhc2ggdmFyaWFudCBpcyB1c2VkLlxuZnVuY3Rpb24gZW5EYXNoZXMoY29udGVudCkge1xuICAgaWYgKCFjb250ZW50KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiYHNwYWNld2VsbCNlbkRhc2hlcygpYDogbm8gY29udGVudCBzdXBwbGllZC5cIik7XG4gICAgICByZXR1cm47XG4gICB9XG5cbiAgIGNvbnN0IE9QRU4gPSBcIjxkYXNoLXdyYXA+XCI7XG4gICBjb25zdCBDTE9TRSA9IFwiPC9kYXNoLXdyYXA+XCI7XG5cbiAgIC8vIERvIG51bWJlcnMgZmlyc3QuIEluY2x1ZGUgYSB2YXJpZXR5IG9mIHdheXMgZGlnaXRzIG1pZ2h0IGJlIGNvbnN0cnVjdGVkLFxuICAgLy8gaW5jbHVkaW5nIGUuZy4gQmlibGUgdmVyc2VzLCBvdGhlciBwdW5jdHVhdGlvbiwgZXRjLlxuICAgY29uc3QgbnVtUGF0dCA9IC8oW1xcZDpcXC5dKykgPyjigJN8Jm5kYXNoO3wmODIxMTt8JngyMDEzOykgPyhcXGQrKS9nO1xuICAgY29uc3Qgd29yZFBhdHQgPSAvKFxcdyspID8o4oCTfCZuZGFzaDt8JjgyMTE7fCZ4MjAxMzspID8oXFx3KykvZztcbiAgIGNvbnN0IHJlcGxhY2VtZW50ID0gYCR7T1BFTn0kMSR7VEhJTl9TUH0ke0VOX0RBU0h9JHtUSElOX1NQfSQzJHtDTE9TRX1gO1xuXG4gICByZXR1cm4gY29udGVudC5yZXBsYWNlKG51bVBhdHQsIHJlcGxhY2VtZW50KS5yZXBsYWNlKHdvcmRQYXR0LCByZXBsYWNlbWVudCk7XG59XG5cbi8vIFRha2UgZS5nLiBcIkouIFIuIFIuIFRvbGtpZW5cIiBvciBcIkouUi5SLiBUb2xraWVuXCIgYW5kIHVzZSB0aGluIHNwYWNlc1xuLy8gYmV0d2VlbiB0aGUgaW5pdGlhbHMuXG5mdW5jdGlvbiBpbml0aWFscyhjb250ZW50KSB7XG4gICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJgc3BhY2V3ZWxsI2luaXRpYWxzKClgOiBubyBjb250ZW50IHN1cHBsaWVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgIH1cblxuICAgLy8gVE9ETzogaW1wbGVtZW50IHRoaXMgaW4gYSB3YXkgdGhhdCBkb2Vzbid0IG1pc3Rha2UgZW5kcyBvZlxuICAgLy8gICAgIHNlbnRlbmNlcy4gQmFzaWNhbGx5LCBJICp0aGluayogaXQgc2hvdWxkIGp1c3QgYmUgYW55dGltZVxuICAgLy8gICAgIHRoYXQgdGhlIHBlcmlvZCBmb2xsb3dzIGEgY2FwaXRhbCBsZXR0ZXIsIGJ1dCB0aGVyZSBtYXkgYmVcbiAgIC8vICAgICB0aGUgb2NjYXNpb25hbCBleGNlcHRpb24uXG4gICBjb25zb2xlLmVycm9yKFwiYHNwYWNld2VsbCNpbml0aWFscygpYCBub3QgeWV0IGltcGxlbWVudGVkLlwiKTtcbn1cblxuLyoqXG4gIEdpdmVuIGEgdmFsaWQgRE9NIGVsZW1lbnQgYGNvbnRhaW5lcmAsIGFwcGx5IG5pY2UgdHlwb2dyYXBoaWNhbCBzcGFjaW5nLlxuICBAcGFyYW0gIHtPYmplY3R9ICAgb3B0aW9ucyAgICAgICAgICAgT3B0aW9ucyBmb3Igd2hpY2ggc3BhY2luZyBydWxlcyB0byB1c2UuXG4gIEBwYXJhbSAge2Jvb2xlYW59ICBvcHRpb25zLmVtRGFzaGVzICBXcmFwIGVtIGRhc2hlcyBpbiBoYWlyIHNwYWNlcy5cbiAgQHBhcmFtICB7Ym9vbGVhbn0gIG9wdGlvbnMuZW5EYXNoZXMgIFdyYXAgZW0gZGFzaGVzIGluIHRoaW4gc3BhY2VzLlxuICBAcGFyYW0gIHtib29sZWFufSAgb3B0aW9ucy5pbml0aWFscyAgU2VwYXJhdGUgaW5pdGlhbHMgd2l0aCB0aGluIHNwYWNlcy5cbiAgQHBhcmFtICB7Tm9kZX0gICAgIGNvbnRhaW5lciAgICAgICAgIEEgZG9jdW1lbnQgZWxlbWVudCB0byBhcHBseSBydWxlcyB0by5cbiAqL1xuZnVuY3Rpb24gc3BhY2V3ZWxsKG9wdGlvbnMsIGNvbnRhaW5lcikge1xuICAgLy8gQ3VycnkgdGhlIGludm9jYXRpb24gZm9yIHBhcnRpYWwgYXBwbGljYXRpb24uXG4gICBjb25zdCBydW4gPSBfY29udGFpbmVyID0+IHtcbiAgICAgIGlmICghX2NvbnRhaW5lci5pbm5lckhUTUwpIHtcbiAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzcGFjZXdlbGw6IGNvbnRhaW5lciBpcyBub3QgYSBgTm9kZWAuXCIpO1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBOT1RFOiBrZXlzIGFyZSBtYXBwZWQgdG8gbmFtZXMgb2YgZnVuY3Rpb25zIGluIHRoZSBtb2R1bGUuXG4gICAgICBjb25zdCBkZWZhdWx0T3B0cyA9IHtcbiAgICAgICAgIGVtRGFzaGVzOiB0cnVlLFxuICAgICAgICAgZW5EYXNoZXM6IHRydWUsXG4gICAgICAgICBpbml0aWFsczogdHJ1ZSxcbiAgICAgICAgIHF1b3RlczogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgY29uc3QgY29uZmlnID0gb3B0aW9ucyB8fCBkZWZhdWx0T3B0cztcblxuICAgICAgY29uc3QgZnVuY3Rpb25zID0geyBlbURhc2hlcywgZW5EYXNoZXMsIGluaXRpYWxzLCBxdW90ZXMgfTtcblxuICAgICAgdmFyIGNvbnRlbnQgPSBfY29udGFpbmVyLmlubmVySFRNTDtcbiAgICAgIGZvciAoY29uc3Qgb3B0IGluIGNvbmZpZykge1xuICAgICAgICAgaWYgKGNvbmZpZ1tvcHRdKSB7XG4gICAgICAgICAgICBjb250ZW50ID0gZnVuY3Rpb25zW29wdF0oY29udGVudCk7XG4gICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIF9jb250YWluZXIuaW5uZXJIVE1MID0gY29udGVudDtcbiAgIH07XG5cbiAgIHJldHVybiAhIWNvbnRhaW5lciA/IHJ1bihjb250YWluZXIpIDogcnVuO1xufVxuXG4vLyBMZXQgdGhlIHVzZXIgaW1wb3J0IHdoYXRldmVyIHRoZXkgbGlrZS5cbmV4cG9ydCB7IHNwYWNld2VsbCwgZW1EYXNoZXMsIGVuRGFzaGVzLCBpbml0aWFscyB9O1xuXG4vLyBCdXQgdGhlIGRlZmF1bHQgaXMganVzdCB0aGUgbWFpbiBzcGFjZXdlbGwgZnVuY3Rpb24uXG5leHBvcnQgZGVmYXVsdCBzcGFjZXdlbGw7XG4iLCJpbXBvcnQgc3BhY2V3ZWxsIGZyb20gXCIuL3NwYWNld2VsbFwiO1xuLy8gaW1wb3J0IHNtY3AgZnJvbSAnc2NtcCc7XG5cbmNvbnN0IHByb2Nlc3MgPSBzcGFjZXdlbGwoeyBlbURhc2hlczogdHJ1ZSwgZW5EYXNoZXM6IHRydWUsIHF1b3RlczogdHJ1ZSB9KTtcbmZvciAoY29uc3QgYXJ0aWNsZSBvZiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImFydGljbGVcIikpIHtcbiAgIHByb2Nlc3MoYXJ0aWNsZSk7XG59XG4iXSwibmFtZXMiOlsicXVvdGVzIiwiY29udGVudCIsImNvbnNvbGUiLCJlcnJvciIsImRxdW9fcGF0dCIsImRxdW9fcmVwbCIsInNxdW9fcGF0dCIsInNxdW9fcmVwbCIsInB1bmN0X3F1b19wYXR0IiwicHVuY3RfcXVvX3JlcGwiLCJyZXBsYWNlIiwiVEhJTl9TUCIsIkhBSVJfU1AiLCJFTV9EQVNIIiwiRU5fREFTSCIsImVtRGFzaGVzIiwiZW5EYXNoZXMiLCJPUEVOIiwiQ0xPU0UiLCJudW1QYXR0Iiwid29yZFBhdHQiLCJyZXBsYWNlbWVudCIsImluaXRpYWxzIiwic3BhY2V3ZWxsIiwib3B0aW9ucyIsImNvbnRhaW5lciIsInJ1biIsIl9jb250YWluZXIiLCJpbm5lckhUTUwiLCJkZWZhdWx0T3B0cyIsImNvbmZpZyIsImZ1bmN0aW9ucyIsIm9wdCIsInByb2Nlc3MiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXJ0aWNsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0VBQUEsU0FBU0EsTUFBVCxDQUFnQkMsT0FBaEIsRUFBeUI7RUFDdEIsTUFBSSxDQUFDQSxPQUFMLEVBQWM7RUFDWEMsSUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsNENBQWQ7RUFDQTtFQUNGOztFQUVELE1BQU1DLFNBQVMsR0FBRyxzQkFBbEI7RUFDQSxNQUFNQyxTQUFTLEdBQUcsbURBQWxCO0VBRUEsTUFBTUMsU0FBUyxHQUFHLHNCQUFsQjtFQUNBLE1BQU1DLFNBQVMsR0FBRyxtREFBbEI7RUFFQSxNQUFNQyxjQUFjLEdBQUcsa0VBQXZCO0VBQ0EsTUFBTUMsY0FBYyxHQUFHLDZCQUF2QjtFQUVBLFNBQU9SLE9BQU8sQ0FDVlMsT0FERyxDQUNLTixTQURMLEVBQ2dCQyxTQURoQixFQUVISyxPQUZHLENBRUtKLFNBRkwsRUFFZ0JDLFNBRmhCLEVBR0hHLE9BSEcsQ0FHS0YsY0FITCxFQUdxQkMsY0FIckIsQ0FBUDtFQUlGOztFQUVELElBQU1FLE9BQU8s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
