/**
 * @param {Event} event
 */
const route = (event) => {
	event = event || window.event;
	event.preventDefault();
	window.scrollTo({ top: 0, behavior: "smooth" });
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

const onLoadEvent = new Event("onload");

const handleLocation = async () => {
	const hash = window.location.hash;
	if (hash == "") {
		window.location.hash = "#/";
		return;
	}
	const url = routes[hash] || routes["404"];
	const html = await fetch(url).then((response) => response.text());
	document.getElementById("main-container").innerHTML = html;
	window.dispatchEvent(onLoadEvent);
};

// Use the "hashchange" event instead of "popstate"
window.addEventListener("hashchange", handleLocation);

window.route = route;

handleLocation();

const headingTextArray = ["Hi, I'm Trott.", "A developer."];
const typingDelay = 100;
const newTextDelay = 700; // Delay between current and next text

/**
 *
 * @param {HTMLElement} typedTextSpan
 * @param {string} typedText
 */
function type(typedTextSpans, TextArrayIndex = 0, charIndex = 0) {
	if (TextArrayIndex >= headingTextArray.length) return;
	typedText = headingTextArray[TextArrayIndex];
	typedTextSpan = typedTextSpans[TextArrayIndex];
	if (charIndex >= typedText.length) {
		// cursorSpan.classList.remove("typing");
		setTimeout(
			type.bind(null, typedTextSpans, TextArrayIndex + 1),
			newTextDelay
		);
		return;
	}
	// if (!cursorSpan.classList.contains("typing"))
	// 	cursorSpan.classList.add("typing");
	typedTextSpan.textContent += typedText.charAt(charIndex++);
	setTimeout(
		type.bind(null, typedTextSpans, TextArrayIndex, charIndex),
		typingDelay
	);
}

window.addEventListener("onload", function () {
	const typedTextSpans = document.querySelectorAll(".typed-text");
	// const cursorSpan = document.querySelector(".type-cursor");
	if (typedTextSpans.length == 0) return;
	setTimeout(type.bind(null, typedTextSpans), newTextDelay);
});
