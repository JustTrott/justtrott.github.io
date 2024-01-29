const typingDelay = 100;
const newLineDelay = 700; // Delay between current and next text
window.isTypeWriterRunning = false;

async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {HTMLElement} typeEffectContainer
 */
async function typeWriter(typeEffectContainer) {
	const textSpan = typeEffectContainer.querySelector(".type-text");
	const textToType = typeEffectContainer.dataset.text;
	// textSpan.textContent = "";
	for (let i = 0; i < textToType.length; i++) {
		if (window.isTypeWriterRunning == false) {
			return;
		}
		textSpan.textContent += textToType.charAt(i);
		await sleep(typingDelay);
	}
}

const handleTypeEffect = async () => {
	window.isTypeWriterRunning = false;
	const headingContainer = document.querySelector(".main-heading");
	if (!headingContainer) return;
	const typeEffectContainers = headingContainer.querySelectorAll(
		".type-effect-container"
	);
	if (typeEffectContainers.length == 0) return;
	headingContainer.style.height = `${
		parseInt(
			getComputedStyle(headingContainer.querySelector(".type-text"))
				.fontSize
		) *
		typeEffectContainers.length *
		1.5
	}px`;
	for (const [i, element] of typeEffectContainers.entries()) {
		const cursorSpan = element.querySelector(".type-cursor");
		cursorSpan.classList.add("typing");
		if (i == 0) {
			await sleep(newLineDelay);
		}
		window.isTypeWriterRunning = true;
		await typeWriter(element);
		if (window.isTypeWriterRunning == false) {
			break;
		}
		if (i == typeEffectContainers.length - 1) {
			await sleep(newLineDelay);
		}
		await sleep(newLineDelay);
		cursorSpan.classList.remove("typing");
	}
};

export { handleTypeEffect };
