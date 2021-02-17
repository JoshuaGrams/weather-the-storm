function isInSelector(elt, selector) {
	while(elt && elt.matches) {
		if(elt.matches(selector)) return true
		elt = elt.parentNode
	}
	return false
}

function revealFirstHidden(ev) {
	// Ignore these elements.
	if(ev) for(const selector of setup.noContinue) {
		if(isInSelector(ev.target, selector)) return
	}
	// Remove any existing continue indicators.
	let shown = $('.passage .continue')
	if(shown) shown.removeClass('continue')
	// Get any hidden items.
	const hidden = $('.passage .hide')
	if(hidden.length > 0) {
		// We're doing the special thing, prevent the default behavior
		ev && ev.preventDefault()
		// If more are hidden, add the continue indicator.
		let show = hidden.first()
		if(hidden.length > 1 && !show.hasClass('nocontinue')) {
			show.addClass('continue')
		}
		// Set the first to fade in and then unhide it.
		show.addClass('fadein')
		show.removeClass('hide')
		// If scrollIntoView() exists (maybe not on IE?), do it.
		if(show[0].scrollIntoView) {
			show[0].scrollIntoView({behavior: 'smooth', block: 'nearest'})
		}
		// If we're being called directly (not from an event),
		// and we're in SugarCube...
		if(ev && State && typeof State.getVar === 'function') {
			// and the variable exists,
			const count = State.getVar(setup.continueVar)
			// increment the number of things we've revealed.
			if(count) count[passage()] = (count[passage()] || 0) + 1
		}
	}
}

// When you open up the story in your browser, add keyboard and mouse handlers.
$(document).ready(function() {
	$('html').on('click', revealFirstHidden)
	$('html').on('keypress', function(ev) {
		const modifiers = ev.ctrlKey || ev.altKey || ev.shiftKey
		if(setup.continueKeys.has(ev.key) && !modifiers) {
			revealFirstHidden(ev)
		}
	})
})

// When a new passage is displayed, remember how much was already revealed.
$(document).on(':passagedisplay', function() {
	// If we're in SugarCube
	if(State && typeof State.getVar === 'function') {
		// $continued[passage()] tells how many hidden items were revealed.
		const count = State.getVar(setup.continueVar)
		const n = count && count[passage()] || 0
		for(let i=0; i<n; ++i) revealFirstHidden()
	}
})
