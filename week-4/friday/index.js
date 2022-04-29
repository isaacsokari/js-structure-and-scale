let favesID = 'places_faves';

/**
 * Add a place to the faves
 * @param {String} id The place ID
 */
function addFave (id) {

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
function removeFave (id) {

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
function isFave (id) {

	// Get saved items
	let faves = JSON.parse(localStorage.getItem(favesID)) || {};

	// Check if fave exists
	return faves[id];

}

/**
 * Handle click events
 * @param  {Event} event The event object
 */
function clickHandler (event) {

	// Make sure a [data-fave] button was clicked
	let btn = event.target.closest('[data-fave]');
	if (!btn) return;

	// Get place ID
	let id = btn.getAttribute('data-fave');

	// Update button UI and save
	if (btn.classList.contains('is-active')) {
		btn.classList.remove('is-active');
		removeFave(id);
	} else {
		btn.classList.add('is-active');
		addFave(id);
	}

}

/**
 * Load buttons into the UI
 * @return {[type]} [description]
 */
function loadButtons () {

	// Check for controls
	let controls = document.querySelector('[data-controls]');
	if (!controls) return;

	// Get the content ID
	let id = controls.getAttribute('data-controls');

	// Inject buttons
	controls.innerHTML =
		`<p>
			<button data-fave="${id}" ${isFave(id) ? 'class="is-active"' : ''}">
				♥ Favorite
			</button>
		</p>`;

}

/**
 * Load icons onto the homepage for favorited places
 */
function loadIcons () {

	// Get places
	let places = document.querySelectorAll('[data-place]');

	// Create an icon
	let icon = document.createElement('span');
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

// Load buttons into the UI
loadButtons();

// Load icons onto the homepage
loadIcons();

// Listen for clicks on fave and visited buttons
document.addEventListener('click', clickHandler);