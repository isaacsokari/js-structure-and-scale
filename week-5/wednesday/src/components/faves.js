let favesID = 'places_faves';

/**
 * Add a place to the faves
 * @param {String} id The place ID
 */
function addFave(id) {
  // Get saved items
  let faves = JSON.parse(localStorage.getItem(favesID)) || {};

  // Add place to it
  faves[id] = true;

  // Save back to localStorage
  localStorage.setItem(favesID, JSON.stringify(faves));
}

/**
 * Remove a place from faves
 * @param {String} id The place ID
 */
function removeFave(id) {
  // Get saved items
  let faves = JSON.parse(localStorage.getItem(favesID)) || {};

  // Remove place from it
  delete faves[id];

  // Save back to localStorage
  localStorage.setItem(favesID, JSON.stringify(faves));
}

/**
 * Check if a place is a favorite
 * @param {String}  id The place ID
 * @param {Boolean}    If true, the place is a favorite
 */
function isFave(id) {
  // Get saved items
  let faves = JSON.parse(localStorage.getItem(favesID)) || {};

  // Check if fave exists
  return faves[id];
}

export { addFave, removeFave, isFave };
