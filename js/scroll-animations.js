const elementInView = (el, dividend = 1) => {
	const elementTop = el.getBoundingClientRect().top;

	return (
		elementTop <=
			(window.innerHeight || document.documentElement.clientHeight) /
				dividend && el.style.opacity == 0
	);
};

const elementOutofView = (el) => {
	const elementTop = el.getBoundingClientRect().top;

	return (
		elementTop >
			(window.innerHeight || document.documentElement.clientHeight) &&
		el.style.opacity != 0
	);
};

const displayScrollElement = (element) => {
	element.classList.add("fade-in");
};

const hideScrollElement = (element) => {
	element.classList.remove("fade-in");
};

let delay = 0; // Initial delay
const delayIncrement = 500; // Delay between each animation in milliseconds

const handleScrollAnimation = (scrollElements) => {
	scrollElements.forEach((el) => {
		if (elementInView(el, 1.25)) {
			setTimeout(() => {
				displayScrollElement(el);
				el.style.opacity = 1;
			}, delay);
			delay += delayIncrement; // Increase the delay for the next animation
		}
	});
	delay = 0; // Reset delay
};
export { handleScrollAnimation };
