function getPaginationArray(currentPage, nrOfPages) {
  var delta = 2,
    range = [],
    rangeWithDots = [],
    l;

  range.push(1);

  if (nrOfPages <= 1) {
    return range;
  }

  for (var i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i < nrOfPages && i > 1) {
      range.push(i);
    }
  }
  range.push(nrOfPages);

  for (i = 0; i < range.length; i++) {
    if (l) {
      if (range[i] - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (range[i] - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(range[i]);
    l = range[i];
  }

  return rangeWithDots;
}

/**
 * Get the url value parameter
 * @param {*} name
 */
function getUrlParam(name) {
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );
 
  if (results == null) {
    return null;
  } else {
    return decodeURI(results[1]) || 0;
  }
}
