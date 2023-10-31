/**
 * @param {Event} event
 */
const route = (event) => {
	event = event || window.event;
	event.preventDefault();
	const path = event.target.getAttribute("href"); // Remove the leading '#'
	window.location.hash = path; // Set the hash part of the URL
};

const routes = {
	"#/": "/pages/index.html",
	"#/notes": "/pages/notes.html",
	"#/projects": "/pages/projects.html",
	"#/contacts": "/pages/contacts.html",
	404: "/pages/404.html",
};

const titles = {
	"#/": "Home",
	"#/notes": "Notes",
	"#/projects": "Projects",
	"#/contacts": "Contacts",
	404: "Page Not Found!",
};

const onLoadEvent = new Event("onload");

async function handleLocation() {
	const hash = window.location.hash;
	if (hash == "") {
		window.location.hash = "#/";
		return;
	}
	const url = routes[hash] || routes["404"];
	const title = titles[hash] || titles["404"];
	const html = await fetch(url).then((response) => response.text());
	document.getElementById("main-container").innerHTML = html;
	window.scrollTo({ top: 0 });
	document.title = title;
	window.dispatchEvent(onLoadEvent);
}

export { route, handleLocation };
