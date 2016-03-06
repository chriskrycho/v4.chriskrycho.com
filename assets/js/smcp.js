'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  // Find all the relevant paragraphs: the first in an article, the first after
  // an hrule, and the first after any header.
  var allPs = document.getElementsByTagName('p');

  // Check the item's previous siblings: we want h1, h2, hr, and null types.
  var relevantPs = allPs.filter(function (el, idx, arr) {
    var previousTag = el.previousSibling.tagName;
    var relevantTags = ['h1', 'h2', 'hr', null];

    return relevantTags.some(function (current) {
      return cur === previousTag;
    });
  });

  // Apply the capitalization function to each of the relevant paragraphs.
  relevantPs.map(smallCapitalize);
};

/**
 * Apply a wrapping span with class `smcp` to the first five words in the
 * paragraph.
 *
 * @param  {Element} p The paragraph element on which to work.
 * @return {Element}   The paragraph with the span inserted.
 */
var smallCapitalize = function smallCapitalize(p) {};

;
//# sourceMappingURL=smcp.js.map