import { route, handleLocation } from "./router.js";
import { blob } from "./blob.js";
import { changeSticky } from "./sticky.js";

// // if there is no hash, add one
// if (window.location.hash == "") {
// 	window.location.hash = "#/";
// }

// Use the "hashchange" event instead of "popstate"
window.addEventListener("hashchange", handleLocation);

window.route = route;

handleLocation();
blob();

window.addEventListener("scroll", () => {
	changeSticky();
});
