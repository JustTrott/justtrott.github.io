// create program that will load content from notes.json and projects.json and then display it in #notes and #projects
// Function to load JSON data from a file and return it as a JavaScript object

async function loadJson(filename) {
	const response = await fetch(filename);
	const data = await response.json();
	// sort notes by date
	data.sort((a, b) => (a.date > b.date ? 1 : a.date > b.date ? -1 : 0));
	return data;
}

// Function to create html element note, using the template-below, without cloning it:
function createShortNote(noteData) {
	const isOfflineMode = false;
	const note = document.createElement("a");
	note.href = `#/notes/${noteData.url}`;
	note.className = "note-link on-scroll-fade-in";
	note.innerHTML = `
		<div class="note-link-title">
			<h2 class="note-link-heading">${noteData.title}</h2>
			<p class="note-link-date">${
				isOfflineMode
					? noteData.date
					: dayjs(noteData.date).format("MMMM DD, YYYY")
			}</p>
		</div>
		<p class="note-link-description">${noteData.description}</p>
	`;
	return note;
}

function displayNote(noteData, noteElement) {
	console.log(noteData);
	noteElement.querySelector(".note-title").innerHTML = noteData.title;
	noteElement.querySelector(".note-date").innerHTML = dayjs(
		noteData.date
	).format("MMMM DD, YYYY");
	noteElement.querySelector(".note-subtitle").innerHTML =
		noteData.description;
	noteElement.querySelector(".note-text").innerHTML = noteData.text;
}

// create note from all the notes in the data and append them to the #notes element
function displayNotes(data, notesElement) {
	const notes = data.map(createShortNote);
	notes.forEach((note) => notesElement.appendChild(note));
}

// Load and display projects
// loadJson("/content/projects.json")
// 	.then((data) => displayData(data, "#projects"))
// 	.catch((error) => console.error("Error:", error));

export { loadJson, displayNote, displayNotes };
