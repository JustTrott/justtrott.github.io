/**
 * @param {Event} event
 */
const route = (event) => {
	event = event || window.event;
	event.preventDefault();
	const path = event.target.getAttribute("href").substr(1); // Remove the leading '#'
	window.location.hash = path; // Set the hash part of the URL
};

const routes = {
	"/": "/pages/index.html",
	"/notes": "/pages/notes.html",
	"/projects": "/pages/projects.html",
	"/contacts": "/pages/contacts.html",
	404: "/pages/404.html", // Use an actual 404 page
};

const handleLocation = async () => {
	const hash = window.location.hash.substr(1); // Remove the leading '#'
	const url = routes[hash] || routes["404"];
	const html = await fetch(url).then((response) => response.text());
	document.getElementById("main-container").innerHTML = html;
};

// Use the "hashchange" event instead of "popstate"
window.addEventListener("hashchange", handleLocation);

// Remove this line to avoid unnecessary function call
// window.onpopstate = handleLocation;

window.route = route;

handleLocation();
