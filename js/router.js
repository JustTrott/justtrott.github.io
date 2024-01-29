import { handleTypeEffect } from "./type-effect.js";
import { handleScrollAnimation } from "./scroll-animations.js";
import { loadJson, displayNoteByUrl, displayNotes } from "./content-loader.js";

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
	const notes = await loadJson("/content/notes.json");
	let title = titles[hashParts[0]];
	if (hashParts.length >= 2) {
		// check if there exists a note with url = hashParts[1]
		const note = notes.find((note) => note.url == hashParts[1]);
		if (!note) {
			url = routes["404"];
			title = titles["404"];
		}
		await handleDefault(url, hashParts);
		if (note) {
			displayNoteByUrl(note, document.getElementById("notes"));
			title = note.title;
		}
	} 
	else {
		await handleDefault(url, hashParts);
		displayNotes(notes, document.getElementById("notes"));
	}
	
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
	console.log(hash);
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
