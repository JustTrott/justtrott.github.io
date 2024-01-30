import { handleTypeEffect } from "./type-effect.js";
import { handleScrollAnimation } from "./scroll-animations.js";
import { loadJson, displayNote, displayNotes } from "./content-loader.js";

/**
 * @param {Event} event
 */
const route = (event) => {
	event = event || window.event;
	event.preventDefault();
	const path = event.target.getAttribute("href"); // Remove the leading '#'
	window.location.hash = path; // Set the hash part of the URL
};

async function handleNote(url, hashParts) {
	const notes = await loadJson("/content/notes.json");
	const note = notes.find((note) => note.url == hashParts[1]);
	if (!note) {
		url = routes["404"];
		return await handleDefault(url, hashParts);
	}
	await handleDefault(url, hashParts);
	displayNote(notes, note, document.getElementById("note"));
	return note.title;
}

async function handleNotes(url, hashParts) {
	if (hashParts.length >= 2) {
		return await handleNote(_routes["note"], hashParts);
	}
	const title = await handleDefault(url, hashParts);
	const notes = await loadJson("/content/notes.json");
	displayNotes(notes, document.getElementById("notes"));

	return title;
}

async function handleDefault(url, hashParts) {
	const html = await fetch(url).then((response) => response.text());
	document.getElementById("main-container").innerHTML = html;
	window.scrollTo({ top: 0 });
	return titles[hashParts[0]] || titles["404"];
}

const routes = {
	"": "/pages/index.html",
	notes: "/pages/notes.html",
	projects: "/pages/projects.html",
	contacts: "/pages/contacts.html",
	404: "/pages/404.html",
};

const _routes = {
	note: "/pages/note.html",
};

const routeFunctions = {
	notes: handleNotes,
	note: handleNote,
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
