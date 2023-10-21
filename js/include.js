function includeHTML(url, containerId) {
	const container = document.getElementById(containerId);

	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.text();
		})
		.then((data) => {
			container.innerHTML = data;
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

includeHTML("/pages/navbar.html", "navbar-container");
includeHTML("/pages/footer.html", "footer-container");
