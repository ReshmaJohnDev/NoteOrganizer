// importing the fs module
const fs = require("fs");

//importing the readline-sync module
let readline = require("readline-sync");

//menus for the display
const menus = [
  "Add a note",
  "List all notes",
  "Read a note",
  "Delete a note",
  "Update a note",
  "Exit",
];

//Utility function to read JSON file
function readFile(fileName) {
  try {
    const data = fs.readFileSync(fileName, "utf8");
    return data ? JSON.parse(data) : []; //If file is empty, return an empty array
  } catch (error) {
    console.log("Error reading the file", fileName);
    return null;
  }
}

// Utility function to write to JSON file
function writeToJSONFile(fileName, notes) {
  try {
    // Convert the books object into a JSON string.
    const data = JSON.stringify(notes);
    fs.writeFileSync(fileName, data);
    console.log(`Data written successfully to ${fileName}`);
  } catch (error) {
    console.log("Error while writing the file ", error);
  }
}

// function to display the menu
function displayMenu(menus) {
  menus.forEach((menu, index) => {
    console.log(`${index + 1}. ${menu}`);
  });
}

// function to display the notes
function displayNote(notesData) {
  if (notesData.length === 0) {
    console.log("No notes available.");
    return;
  }
  notesData.forEach((note, index) =>
    console.log(
      `${index + 1}. Title: ${note.title} \n   Body: ${
        note["body"]
      } \n   Added on: ${note.time_added} `
    )
  );
}

// function to add the notes
function addNote() {
  let title = readline.question("Enter note title:  ");
  // Validate title
  while (!title.trim()) {
    console.log("Title cannot be empty. Please enter a valid title.");
    title = readline.question("Enter note title:  ");
  }
  let body = readline.question("Enter note body:  ");

  while (!body.trim()) {
    console.log("TBody cannot be empty. Please enter a valid body.");
    body = readline.question("Enter note body:  ");
  }

  const time_added = new Date().toISOString().split(".")[0] + "Z";
  const notesData = readFile("notes.json");
  notesData.push({ title, body, time_added });
  writeToJSONFile("notes.json", notesData);
  console.log("Note added successfully!");
}

// function to list the notes
function listNote() {
  const notesData = readFile("notes.json");
  displayNote(notesData);
}

// function to read the notes
function readNote() {
  let searchTitle = readline.question("Enter note title:  ");
  while (!searchTitle.trim()) {
    console.log("Title cannot be empty. Please enter a valid title.");
    searchTitle = readline.question("Enter note title:  ");
  }
  const notesData = readFile("notes.json");
  const findResults = notesData.filter((note) => note.title === searchTitle);

  if (findResults) {
    displayNote(findResults);
  } else {
    console.log("No note found with that title.");
  }
}

// function to delete the notes
function deleteNote() {
  let deleteNote = readline.question("Enter note title:  ");
  while (!deleteNote.trim()) {
    console.log("Title cannot be empty. Please enter a valid title.");
    deleteNote = readline.question("Enter note title:  ");
  }
  const notesData = readFile("notes.json");
  const noteIndex = notesData.findIndex((note) => note.title === deleteNote);
  if (noteIndex !== -1) {
    const updatedNote = notesData.filter((note) => note.title !== deleteNote);
    writeToJSONFile("notes.json", updatedNote);
    console.log("Note deleted successfully!");
  } else {
    console.log("No note found with that title.");
  }
}

// function to update the notes
function updateNote() {
  let updateTitle = readline.question("Enter note title:  ");

  // Validate title
  while (!updateTitle.trim()) {
    console.log("Title cannot be empty. Please enter a valid title.");
    updateTitle = readline.question("Enter note title:  ");
  }
  const notesData = readFile("notes.json");
  const noteIndex = notesData.findIndex((note) => note.title === updateTitle);
  if (noteIndex !== -1) {
    const newBody = readline.question("Enter new note body:  ");
    notesData[noteIndex].body = newBody;
    writeToJSONFile("notes.json", notesData);
    console.log("Note updated successfully!");
  } else {
    console.log("No such note title");
  }
}

//main function to display the menu and get user input
function main() {
  while (true) {
    displayMenu(menus);
    const userChoice = Number(readline.question("Enter your choice:  "));
    switch (userChoice) {
      case 1:
        addNote();
        break;

      case 2:
        listNote();
        break;

      case 3:
        readNote();
        break;

      case 4:
        deleteNote();
        break;

      case 5:
        updateNote();
        break;

      case 6:
        console.log("Exiting the program...");
        process.exit();
        break;

      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

main();
