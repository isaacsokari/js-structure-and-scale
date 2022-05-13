(function () {
  'use strict';

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

  /**
   * Load buttons into the UI
   * @return {[type]} [description]
   */
  function loadButtons() {
    // Check for controls
    let controls = document.querySelector('[data-controls]');
    if (!controls) return;

    // Get the content ID
    let id = controls.getAttribute('data-controls');

    // Inject buttons
    controls.innerHTML = `
			<button
        type="button"
        data-fave="${id}" 
        aria-pressed="${isFave(id) ? 'true' : 'false'}"
      >
          <span aria-hidden="true">♥</span> Favorite
			</button>
		`;
  }

  /**
   * Handle click events
   * @param  {Event} event The event object
   */
  function clickHandler(event) {
    // Make sure a [data-fave] button was clicked
    let btn = event.target.closest('[data-fave]');
    if (!btn) return;

    // Get place ID
    let id = btn.getAttribute('data-fave');
    let state = btn.getAttribute('aria-pressed');

    // Update button UI and save
    if (state === 'true') {
      btn.setAttribute('aria-pressed', 'false');
      removeFave(id);
    } else {
      btn.setAttribute('aria-pressed', 'true');
      addFave(id);
    }
  }

  // Listen for clicks on fave and visited buttons
  document.addEventListener('click', clickHandler);

  // Load buttons into the UI
  loadButtons();
})();
