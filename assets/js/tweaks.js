(function ($) {
  // Find all the relevant paragraphs: the first in an article, the first after
  // an hrule, and the first after any header.
  let $firstP = $('.content p').first(),
      $hrPs = $('hr + p'),
      $h1Ps = $('h1 + p'),
      allPs = $().add($firstP).add($hrPs).add($h1Ps);

})(jQuery);
