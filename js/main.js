import { route, handleLocation } from "./router.js";
import { handleTypeEffect } from "./type-effect.js";
import { handleScrollAnimation } from "./scroll-animations.js";
import { changeSticky } from "./sticky.js";

// Use the "hashchange" event instead of "popstate"
window.addEventListener("hashchange", handleLocation);

window.route = route;

handleLocation();

window.addEventListener("onload", async function () {
	const scrollElements = document.querySelectorAll(".on-scroll-fade-in");
	for (const element of scrollElements) {
		element.style.opacity = 0;
	}
	window.addEventListener("scroll", () => {
		handleScrollAnimation(scrollElements);
	});
	handleScrollAnimation(scrollElements);
	handleTypeEffect();
});

window.addEventListener("scroll", () => {
	changeSticky();
});
