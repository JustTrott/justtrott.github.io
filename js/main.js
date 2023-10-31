import { route, handleLocation } from "./router.js";
import { handleTypeEffect } from "./type-effect.js";
import { handleScrollAnimation } from "./scroll-animations.js";
import { changeSticky } from "./sticky.js";
import { loadJson, createShortNote, displayNotes } from "./content-loader.js";

// Use the "hashchange" event instead of "popstate"
window.addEventListener("hashchange", handleLocation);

window.route = route;

handleLocation();

window.addEventListener("onload", async function () {
	if (document.getElementById("notes")) {
		const notes = await loadJson("/content/notes.json");
		displayNotes(notes, "#notes");
	}
	const scrollElements = document.querySelectorAll(".on-scroll-fade-in");
	for (const element of scrollElements) {
		element.style.opacity = 0;
	}
	window.addEventListener("scroll", () => {
		handleScrollAnimation(scrollElements);
	});
	handleScrollAnimation(scrollElements);
	handleTypeEffect();
	// Load and display notes if #notes is present
});

window.addEventListener("scroll", () => {
	changeSticky();
});
