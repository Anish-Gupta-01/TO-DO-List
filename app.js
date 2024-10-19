const inputBox = document.getElementById("inputBox");
const btn = document.getElementById("btn");
const todolist = document.getElementById("todolist");

let isEditing = false; // Track if an item is being edited
let currentEditLi;

function addtask(){
    const task = inputBox.value.trim();  // Trims any leading/trailing spaces
    if(task === ''){
        alert("Make Your TO-DO List...");
    } else if(isEditing){
        currentEditLi.querySelector('p').innerText = task;
        isEditing = false;
        currentEditLi = null;   
    }else {
        let li = document.createElement("li");
        li.innerHTML = `<p>${task}</p>`;  // Added a <p> for styling and possible edits
        todolist.appendChild(li);

        // Create and append delete button (span)
        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "\u00d7";
        deleteBtn.classList.add('deleteBtn');
        li.appendChild(deleteBtn);

        // Create and append edit button
        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add('editbtn');
        editBtn.onclick = function() {
        editTask(li);  // Function to edit task
    };
    li.appendChild(editBtn);
    }
    inputBox.value = '';
    saveData();
};

// Function to edit tasks
function editTask(li) {
    inputBox.value = li.querySelector('p').innerText; // Set input box to current task text
    isEditing = true; // Set editing state to true
    currentEditLi = li; // Track the current item being edited

}

todolist.addEventListener("click", function(e){
    if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData(){
    localStorage.setItem("data", todolist.innerHTML);
}

function showData(){
    todolist.innerHTML = localStorage.getItem("data");
}
showData();