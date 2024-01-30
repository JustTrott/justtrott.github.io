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

function displayNote(notes, note, noteElement) {
	noteElement.querySelector(".note-title").innerHTML = note.title;
	noteElement.querySelector(".note-date").innerHTML = dayjs(note.date).format(
		"MMMM DD, YYYY"
	);
	noteElement.querySelector(".note-subtitle").innerHTML = note.description;
	noteElement.querySelector(".note-text").innerHTML = note.text;
	// if there are no next or previous notes, hide the buttons
	// determine next and previous notes by comparing the current note's date with the dates of all the notes
	const noteIndex = notes.findIndex((listNote) => listNote.url == note.url);
	const previousNoteButton = noteElement.querySelector(
		"#previous-note-button"
	);
	console.log(notes);
	const nextNoteButton = noteElement.querySelector("#next-note-button");
	if (noteIndex == notes.length - 1) {
		previousNoteButton.classList.add("hidden");
	} else {
		previousNoteButton.classList.remove("hidden");
		// if there is a previous note, add a link to it
		previousNoteButton.href = `#/notes/${notes[noteIndex + 1].url}`;
	}
	if (noteIndex == 0) {
		nextNoteButton.classList.add("hidden");
	} else {
		nextNoteButton.classList.remove("hidden");
		// if there is a next note, add a link to it
		nextNoteButton.href = `#/notes/${notes[noteIndex - 1].url}`;
	}
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
