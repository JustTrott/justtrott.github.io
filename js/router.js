import { handleTypeEffect } from "./type-effect.js";
import { handleScrollAnimation } from "./scroll-animations.js";
import { loadJson, createShortNote, displayNotes } from "./content-loader.js";

/**
 * @param {Event} event
 */
const route = (event) => {
	event = event || window.event;
	event.preventDefault();
	const path = event.target.getAttribute("href"); // Remove the leading '#'
	window.location.hash = path; // Set the hash part of the URL
};

async function handleNotes(url, hashParts) {
	const title = handleDefault(url, hashParts);
	const notes = await loadJson("/content/notes.json");
	displayNotes(notes, document.getElementById("notes"));
	if (hashParts.length > 2) {
	}
	return title;
}

async function handleDefault(url, hashParts) {
	const html = await fetch(url).then((response) => response.text());
	document.getElementById("main-container").innerHTML = html;
	window.scrollTo({ top: 0 });
	return titles[hashParts[0]];
}

const routes = {
	"": "/pages/index.html",
	notes: "/pages/notes.html",
	projects: "/pages/projects.html",
	contacts: "/pages/contacts.html",
	404: "/pages/404.html",
};

const routeFunctions = {
	notes: handleNotes,
};

const titles = {
	"": "Home",
	notes: "Notes",
	projects: "Projects",
	contacts: "Contacts",
	404: "Page Not Found!",
};

const onLoadEvent = new Event("onload");

async function handleLocation() {
	const hash = window.location.hash;
	if (hash == "") {
		window.location.hash = "#/";
		return;
	}
	const hashParts = hash.split("/").slice(1);
	const url = routes[hashParts[0]] || routes["404"];
	const routeFunction = routeFunctions[hashParts[0]] || handleDefault;
	const title = await routeFunction(url, hashParts);
	const scrollElements = document.querySelectorAll(".on-scroll-fade-in");
	for (const element of scrollElements) {
		element.style.opacity = 0;
	}
	window.addEventListener("scroll", () => {
		handleScrollAnimation(scrollElements);
	});
	handleScrollAnimation(scrollElements);
	handleTypeEffect();
	document.title = title;
	window.dispatchEvent(onLoadEvent);
}

export { route, handleLocation };
