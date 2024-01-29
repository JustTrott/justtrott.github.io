function blob() {
	const blob = document.getElementById("blob");
	const footer = document.getElementById("footer"); // Assuming your footer has id "footer"
	const blobHeight = blob.offsetHeight;

	if (window.matchMedia("(pointer: coarse)").matches) {
		blob.style.display = "none";
	} else {
		let lastX, lastY;

		function moveBlob(e) {
			if (e.type === "mousemove") {
				lastX = e.clientX;
				lastY = e.clientY;
			}

			let x = e.pageX || lastX + window.scrollX;
			let y = e.pageY || lastY + window.scrollY;
			const footerBottom = footer.offsetTop + footer.offsetHeight;

			// Prevent blob from going below the footer
			if (y > footerBottom - blobHeight) {
				y = footerBottom - blobHeight;
			}

			blob.animate(
				{
					left: `${x}px`,
					top: `${y}px`,
				},
				{ duration: 3000, fill: "forwards", easing: "ease-in-out" }
			);
		}

		document.addEventListener("mousemove", moveBlob);
		window.addEventListener("scroll", moveBlob);
	}
}

export { blob };
