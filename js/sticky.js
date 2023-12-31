// Get the header
var header = document.getElementById("header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function changeSticky() {
	if (
		window.scrollY >
		sticky + parseInt(getComputedStyle(header).fontSize) * 3
	) {
		header.classList.add("sticky");
	} else {
		header.classList.remove("sticky");
	}
}

export { changeSticky };
