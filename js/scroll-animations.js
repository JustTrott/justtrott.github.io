const elementInView = (el, dividend = 1) => {
	const elementTop = el.getBoundingClientRect().top;

	return (
		elementTop <=
		(window.innerHeight || document.documentElement.clientHeight) / dividend
	);
};

const elementOutofView = (el) => {
	const elementTop = el.getBoundingClientRect().top;

	return (
		elementTop >
		(window.innerHeight || document.documentElement.clientHeight)
	);
};

const displayScrollElement = (element) => {
	element.classList.add("fade-in");
};

const hideScrollElement = (element) => {
	element.classList.remove("fade-in");
};

const handleScrollAnimation = (scrollElements) => {
	scrollElements.forEach((el) => {
		if (elementInView(el, 1.25)) {
			displayScrollElement(el);
			el.style.opacity = 1;
		} else if (elementOutofView(el)) {
			hideScrollElement(el);
			el.style.opacity = 0;
		}
	});
};

export { handleScrollAnimation };
