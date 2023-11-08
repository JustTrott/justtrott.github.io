import { route, handleLocation } from "./router.js";
import { blob } from "./blob.js";
import { changeSticky } from "./sticky.js";

// Use the "hashchange" event instead of "popstate"
window.addEventListener("hashchange", handleLocation);

window.route = route;

handleLocation();
blob();

window.addEventListener("scroll", () => {
	changeSticky();
});
