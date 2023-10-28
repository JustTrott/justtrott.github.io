// When the user scrolls the page, execute myFunction
window.onscroll = function () {
	changeSticky();
};

function convertRemToPixels(rem) {
	return (
		rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
	);
}

// Get the header
var header = document.getElementById("header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function changeSticky() {
	if (window.scrollY > sticky) {
		header.classList.add("sticky");
	} else {
		header.classList.remove("sticky");
	}
}