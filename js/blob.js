const blob = document.getElementById("blob");
if (window.matchMedia("(pointer: coarse)").matches) {
	blob.style.display = "none";
} else {
	let lastX, lastY;

	function moveBlob(e) {
		if (e.type === "mousemove") {
			lastX = e.clientX;
			lastY = e.clientY;
		}

		const x = e.pageX || lastX + window.scrollX;
		const y = e.pageY || lastY + window.scrollY;

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
