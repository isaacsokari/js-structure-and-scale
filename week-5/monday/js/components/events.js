import { removeFave, addFave } from './faves.js';

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
