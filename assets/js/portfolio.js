/*
	Highlights the unit being read in the Learning Artefacts unit bar,
	and keeps that unit's button in view when the bar scrolls sideways on small screens.
*/
(function() {

	var links = document.querySelectorAll('.unit-nav a');

	// Keep the unit bar directly under the fixed header, whose height changes with screen size.
	var header = document.getElementById('header');

	function placeBar() {
		document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
	}

	if (header) {
		placeBar();
		window.addEventListener('resize', placeBar);
	}

	if (!links.length || !('IntersectionObserver' in window))
		return;

	var linkFor = {};

	links.forEach(function(link) {
		linkFor[link.getAttribute('href').slice(1)] = link;
	});

	function activate(id) {
		var link = linkFor[id];

		if (!link || link.classList.contains('active'))
			return;

		links.forEach(function(l) { l.classList.remove('active'); });
		link.classList.add('active');

		var bar = link.closest('.unit-nav');
		bar.scrollTo({ left: link.offsetLeft - (bar.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
	}

	// A unit counts as "being read" once its card crosses a line about a third of the way down the screen.
	var observer = new IntersectionObserver(function(entries) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting)
				activate(entry.target.id);
		});
	}, { rootMargin: '-30% 0px -65% 0px' });

	Object.keys(linkFor).forEach(function(id) {
		var section = document.getElementById(id);

		if (section)
			observer.observe(section);
	});

})();
