import { isFave } from './faves.js';

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
 * Load icons onto the homepage for favorited places
 */
function loadIcons() {
  // Get places
  let places = document.querySelectorAll('[data-place]');

  // Create an icon
  let icon = document.createElement('span');
  icon.setAttribute('aria-label', '(Favorite)');
  icon.textContent = ' ♥';

  // Loop through each place and add an icon if it's a favorite
  for (let place of places) {
    // Get the place ID
    let id = place.getAttribute('data-place');

    // If place is not a fave, carry on
    if (!isFave(id)) continue;

    // Otherwise, add an icon
    let title = place.querySelector('.place-title');
    if (!title) continue;
    title.append(icon.cloneNode(true));
  }
}

export { loadButtons, loadIcons };
