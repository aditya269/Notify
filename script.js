// Add note to local storage
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById("addTitle");
    let addText = document.getElementById("addText");
    if (addTitle.value == "" || addText.value == "") {
        return alert("Please add Note Title and Text");
    }
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addText.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
});
// Function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `  <div class="card note-card mb-5"  style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title" id="title">${element.title}</h5>
        <p class="card-text" id="text">${element.text}</p>
        <button class="btn btn-danger remove-btn" id=" ${index}" onclick="deleteNote(this.id)">Remove<i class="fas fa-trash"></i></button>
        <button class="btn btn-success edit-btn" id=" ${index}" onclick="editNote(this.id)">Edit <i class="fas fa-pen"></i></button>
        </div> </div>`;

    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
    }

}

// Function to delete a note
function deleteNote(index) {
    let confirmDel = confirm(`Delete this  note?`);
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes")
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index,1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }

}

// Function to Edit the Note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("addTitle");
    let addText = document.getElementById("addText");

    if (addTitle.value !== "" || addText.value !== "") {
      return alert("Please clear the form before editing a note")
    } 

    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

    notesObj.findIndex((element, index) => {
      addTitle.value = element.title;
      addText.value = element.text;
    })
    notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
}

// Function to Search the Note
let search=document.getElementById("search-box");
search.addEventListener("input",function () {
    let inputVal=search.value;
    let noteCards=document.getElementsByClassName('note-card');
    Array.from(noteCards).forEach(function (element) {
        let cardTitle=element.getElementsByTagName("h5")[0].innerText;
        if(cardTitle.includes(inputVal)){
            element.style.display ="block";
        }
        else{
            element.style.display ="none";
        }
        
    })
    
})
showNotes();


// Dark/Light Mode Toggle Button
var head = document.getElementsByTagName('HEAD')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';

link.type = 'text/css';

link.href = 'css/dark.css';
head.appendChild(link);
let toggleBtn = document.getElementById("toggle-btn");
link.rel = 'stylesheet';

link.type = 'text/css';

link.href = 'css/light.css';
head.appendChild(link);

function toggleTheme() {
    if (toggleBtn.checked == true) {
        link.rel = 'stylesheet';

        link.type = 'text/css';

        link.href = 'css/dark.css';
        head.appendChild(link);
    }
    if (toggleBtn.checked == false) {
        link.rel = 'stylesheet';

        link.type = 'text/css';

        link.href = 'css/light.css';
        head.appendChild(link);
    }
}


