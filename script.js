console.log("Welcome to notes app. This is app.js");
showNotes(); // Display existing notes on page load

// If the user adds a note, save it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");

  // Parse the notes or initialize as an empty array
  let notesObj = notes ? JSON.parse(notes) : [];

  // Add the new note to the notes array
  notesObj.push(addTxt.value);

  // Save updated notes to localStorage
  localStorage.setItem("notes", JSON.stringify(notesObj));

  // Clear the input field and refresh the notes display
  addTxt.value = "";
  showNotes();
});

// Function to display notes from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  let notesObj = notes ? JSON.parse(notes) : [];
  
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
      <div class="noteCard my-2 mx-2 card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button class="btn btn-primary" onclick="deleteNote(${index})">Delete Note</button>
        </div>
      </div>`;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length !== 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use the "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  let notesObj = notes ? JSON.parse(notes) : [];

  // Remove the note at the specified index
  notesObj.splice(index, 1);

  // Save the updated notes array to localStorage
  localStorage.setItem("notes", JSON.stringify(notesObj));

  // Refresh the notes display
  showNotes();
}

// Function to search through notes
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");

  // Loop through each note card and hide/show based on the search input
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;

    if (cardTxt.toLowerCase().includes(inputVal)) {
      element.style.display = "block"; // Show the note if it matches the search
    } else {
      element.style.display = "none"; // Hide the note if it doesn't match
    }
  });
});

// Fix for the incomplete function
// You had a broken "sample" function at the end of the code
const sample = () => {
  console.log("This is a sample function!");
  // You can add more functionality here if needed
};
