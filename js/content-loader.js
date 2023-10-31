// create program that will load content from notes.json and projects.json and then display it in #notes and #projects
// Function to load JSON data from a file and return it as a JavaScript object

async function loadJson(filename) {
	const response = await fetch(filename);
	const data = await response.json();
	// sort notes by date
	data.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
	return data;
}

// Function to create html element note, using the template-below, without cloning it:
function createShortNote(noteData) {
	const note = document.createElement("div");
	console.log(noteData);
	note.className = "note on-scroll-fade-in";
	note.innerHTML = `
        <div class="note-title">
            <h2 class="note-heading">${noteData.title}</h2>
            <p class="note-date">${dayjs(noteData.date).format(
				"MMMM DD, YYYY"
			)}</p>
        </div>
        <p class="note-description">${noteData.description}</p>
    `;
	return note;
}

// create note from all the notes in the data and append them to the #notes element
function displayNotes(data, elementId) {
	const notes = data.map(createShortNote);
	const notesElement = document.querySelector(elementId);
	notes.forEach((note) => notesElement.appendChild(note));
}

// Load and display projects
// loadJson("/content/projects.json")
// 	.then((data) => displayData(data, "#projects"))
// 	.catch((error) => console.error("Error:", error));

export { loadJson, createShortNote, displayNotes };
