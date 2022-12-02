//$ Constants and Variables

const newTaskBtn = document.querySelector(".new-task");
const containerEl = document.querySelector(".container");
const eraseBtn = document.querySelector(".erase");
const deleteBtn = document.querySelector(".delete");
let deleteRowBtn = document.querySelectorAll(".fa-delete-left");

const duckEl = document.querySelector(".no-task-img");
const projectSprintEl = document.querySelector(".project-sprint");
const pathModulesEl = document.querySelectorAll(".path-modules");
const rightEl = document.querySelector(".right");
const middleEl = document.querySelector(".middle");
const leftEl = document.querySelector(".left");
const packageEl  = document.querySelectorAll(".package");

let i = 2;

//$ Event Listeners

//Create task module
newTaskBtn.addEventListener("click", function(e) {
    checkEmpty();
    if(!eraseBtn.classList.contains("erase-active")) {
    let wrapper = document.createElement("div");
    wrapper.classList.add("path-module");
    
    wrapper.insertAdjacentHTML("beforeend", 
    `
        <i class="fa-solid fa-delete-left"></i>
        <ul class="package epic">
            <li class="task-module">Epic ${i++}</li>
        </ul>
        <div><i class="fa-solid fa-arrow-right"></i></div>
        <ul class="package user-story"></ul>
        <div><i class="fa-solid fa-arrow-right"></i></div>
        <ul class="package subtask"></ul>
        <div><i class="fa-solid fa-arrow-right"></i></div>
        <ul class="package optional"></ul>
    `);
    containerEl.appendChild(wrapper);
    }
})

eraseBtn.addEventListener("click", function(e) {
    eraseBtn.classList.toggle("erase-active");
    activateDeleteRows();
    checkEmpty();
})

//Delete SprintQuest canvas
deleteBtn.addEventListener("click", function(e) {
    if(confirmDelete()){
        while(containerEl.childElementCount > 0) {
            containerEl.lastElementChild.remove();
        }
        i = 1;
        if(duckEl.classList.contains('invisible'))
        checkEmpty();
    }
})

//Create task
containerEl.addEventListener("click", function(e) {
    if(e.target && e.target.matches("ul.package") && !eraseBtn.classList.contains('erase-active')) {
        let wrapper = document.createElement("li");
        wrapper.classList.add('task-module');
        wrapper.textContent = "Untitled " + e.target.classList[1];
        e.target.appendChild(wrapper);
    }
})

//Erase task
containerEl.addEventListener("click", function(e) {
    if(eraseBtn.classList.contains('erase-active') && (e.target.matches("li.task-module") || e.target.matches("i.fa-delete-left"))) {
        e.target.classList.add('toRemove');
    }
})

//Erase Path Module
containerEl.addEventListener("click", function(e) {
    if(eraseBtn.classList.contains('erase-active') && e.target.matches("i.fa-delete-left")) {
        e.target.parentElement.classList.add('toRemove');
    }
})


//When task is clicked open task form to input info
middleEl.addEventListener("dblclick", function(e) {
    if(e.target && (e.target.matches("li.task-module") || e.target.matches("div.project-sprint")) && !eraseBtn.classList.contains('erase-active')) {
        rightEl.style.display = 'block';
    }
})

//Cancel task creation
rightEl.addEventListener("click", function(e) {
    if(e.target && e.target.matches("button.cancel")) {
        rightEl.style.display = 'none';
    }
})

//$ Functions

function checkEmpty() {
    if(containerEl.childElementCount === 0) {
        duckEl.classList.toggle('invisible');
        projectSprintEl.classList.toggle('invisible');
        rightEl.classList.toggle('invisible');
    }
}

function confirmDelete() {
    let text = "You are about to delete your whole quest. Are you sure?";
    return (confirm(text) == true);
}

function activateDeleteRows() 
{
    deleteRowBtn = document.querySelectorAll(".fa-delete-left");
    deleteRowBtn.forEach(deleteRowBtn => deleteRowBtn.classList.toggle('display'));
}
