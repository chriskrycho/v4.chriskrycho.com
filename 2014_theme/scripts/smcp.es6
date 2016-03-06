/**
  Apply a wrapping span with class `smcp` to the first five words in the
  paragraph.

  @param  {Element} p The paragraph element on which to work.
  @return {Element}   The paragraph with the span inserted.
 */
function smallCapitalize(p) {

}


export default function() {
  // Find all the relevant paragraphs: the first in an article, the first after
  // an hrule, and the first after any header.
  let allPs = document.getElementsByTagName('p');

  // Check the item's previous siblings: we want h1, h2, hr, and null types.
  let relevantPs = allPs.filter((el, idx, arr) => {
    let previousTag = el.previousSibling.tagName;
    let relevantTags = ['h1', 'h2', 'hr', null];

    return relevantTags.some((current, ...etc) => cur === previousTag);
  });

  // Apply the capitalization function to each of the relevant paragraphs.
  relevantPs.map(smallCapitalize);
};
