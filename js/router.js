/**
 * @param {Event} event
 */
const route = (event) => {
	event = event || window.event;
	event.preventDefault();
	window.history.pushState({}, "", event.target.href);
	handleLocation();
};

const routes = {
	"/": "/pages/index.html",
	"/notes": "/pages/notes.html",
	"/projects": "/pages/projects.html",
	"/contacts": "/pages/contacts.html",
};

const handleLocation = async () => {
	const path = window.location.pathname;
	const url = routes[path] || routes[404];
	const html = await fetch(url).then((response) => response.text());
	document.getElementById("main-container").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
