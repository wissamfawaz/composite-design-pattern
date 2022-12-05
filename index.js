import {Task, Epic, UserStory, Sprint} from "./composite.js";

//$ Constants and Variables

const newTaskBtn = document.querySelector(".new-task");
const containerEl = document.querySelector(".container");
const eraseBtn = document.querySelector(".erase");
const deleteBtn = document.querySelector(".delete");
const cancelFormBtn = document.querySelector(".cancel");
const saveFormBtn = document.querySelector(".submit");
let deleteRowBtn = document.querySelectorAll(".fa-delete-left");

const packageLabelsEl = document.querySelector(".package-labels");
const duckEl = document.querySelector(".no-task-img");
const projectSprintEl = document.querySelector(".project-sprint");
const rightEl = document.querySelector(".right");
const middleEl = document.querySelector(".middle");
const formEl = document.getElementById("form");

//$ Initiating the project
//feature backend
const sprint = new Sprint();

//$ Event Listeners

//Create task module (row)
newTaskBtn.addEventListener("click", function(e) {
    checkEmpty();
    if(!eraseBtn.classList.contains("erase-active")) {
    let wrapper = document.createElement("div");
    wrapper.classList.add("path-module");
    
    wrapper.insertAdjacentHTML("beforeend", 
    `
        <i class="fa-solid fa-delete-left"></i>
        <ul class="package epic">
            <li class="task-module">Untitled Epic</li>
        </ul>
        <div><i class="fa-solid fa-arrow-right"></i></div>
        <ul class="package user-story"></ul>
        <div><i class="fa-solid fa-arrow-right"></i></div>
        <ul class="package subtask"></ul>
        <div><i class="fa-solid fa-arrow-right"></i></div>
        <ul class="package optional"></ul>
    `);
    containerEl.appendChild(wrapper);

    //TODO
    // sprint.addUserStory();
    }
})

//Erase button activate / deactivate
eraseBtn.addEventListener("click", function(e) {
    eraseBtn.classList.toggle("erase-active");
    if(eraseBtn.classList.contains("erase-active")) {
        eraseBtn.title = 'Deactivate Eraser'
    } else {
        eraseBtn.title = 'Activate Eraser'
    }
    activateDeleteRows();
})

//Delete SprintQuest canvas
deleteBtn.addEventListener("click", function(e) {
    if(confirmDelete()){
        while(containerEl.childElementCount > 0 && !containerEl.lastElementChild.matches("div.package-labels")) {
            containerEl.lastElementChild.remove();
        }
        if(duckEl.classList.contains("invisible"))
        checkEmpty();

        sprint.clearSprint();
    }
})

//Create task
containerEl.addEventListener("click", function(e){
    if(e.target.matches("ul.package")) {
        if(!e.target.classList.contains("epic")|| e.target.childElementCount == 0){
            createTask(e)
        }
    }
});

//TODO link to backend
//Erase task
containerEl.addEventListener("click", function(e) {
    if(eraseBtn.classList.contains('erase-active') && e.target.matches("li.task-module")) {
        e.target.parentNode.removeChild(e.target);
    }
})

//TODO link to backend
//Erase Path Module
containerEl.addEventListener("click", function(e) {
    if(eraseBtn.classList.contains('erase-active') && e.target.matches("i.fa-delete-left")) {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    }
    checkEmpty();
})

//TODO link to backend
//When task is double-clicked open task form to input info
middleEl.addEventListener("dblclick", async function(e) {
    let target = e.target;
    if(target && (target.matches("li.task-module") || target.matches("div.project-sprint")) && !eraseBtn.classList.contains('erase-active')) {
        toggleForm(true);
        await formResult()
        .then(() => {return saveChild(target, getData(e), getChildIndex(target));
        })
        .catch(() => {})
    }
})

//Cancel task creation
rightEl.addEventListener("click", function(e) {
    if(e.target && e.target.matches("button.cancel")) {
        rightEl.style.display = 'none';
    }
})

//Listens for form submission
formEl.addEventListener("submit", function(e){
    getData(e);
    formEl.reset(); 
    toggleForm(false);
})

//$ Functions

function checkEmpty() {
    if(containerEl.childElementCount === 1) {
        duckEl.classList.toggle('invisible');
        projectSprintEl.classList.toggle('invisible');
        rightEl.classList.toggle('invisible');
        packageLabelsEl.classList.toggle('invisible');
    }
}

function confirmDelete() {
    let text = "You are about to NUKE your whole SprintQuest. Any remaining unsaved changes will be lost. Are you sure?";
    return (confirm(text));
}

//Makes the delete row buttons visible / invisible
function activateDeleteRows() 
{
    deleteRowBtn = document.querySelectorAll(".fa-delete-left");
    deleteRowBtn.forEach(deleteRowBtn => deleteRowBtn.classList.toggle('display'));
}

//Gets the data from HTML form
function getData(e)
{
    e.stopImmediatePropagation();
    e.preventDefault();
    let data = new FormData(formEl);
    return data;
}

function getChildIndex(child) 
{
    return Array.from(child.parentNode.children).indexOf(child);
}

//Toggles the form's visibility display 
function toggleForm(flag)
{
    if(flag)
    rightEl.style.display = 'block';
    else
    rightEl.style.display = 'none';
}

//Awaits form response: cancel or save
async function createTask(e)
{
    const target = e.target;

    if(target && !eraseBtn.classList.contains('erase-active') && rightEl.style.display != 'block') {
        toggleForm(true);
        let wrapper = document.createElement("li");
        wrapper.classList.add('task-module');
        wrapper.textContent = "Untitled " + target.classList[1];
        target.appendChild(wrapper);

        await formResult()
            .then(() => {console.log('.then'); return saveChild(wrapper, getData(e), getChildIndex(wrapper));}, () => {console.log('.catch');target.removeChild(wrapper);});
    }
}

function formResult()
{
    return new Promise((resolve, reject) => {
        saveFormBtn.addEventListener("click", function () {
            resolve();
        });
        cancelFormBtn.addEventListener("click", function () {
            reject();
        });
    });
}

function updateQuestName(child, data) 
{
    child.textContent = data.get('task-name');
}

//TODO link to backend
//Appends children to the corresponding composite
function saveChild(child, data, childIndex) {
    let rowIdx = Array.from(child.parentNode.parentNode.parentNode.children).indexOf(child.parentNode.parentNode) -1;
    updateQuestName(child, data);

    if(child.parentNode.classList.contains('epic')) {
        sprint.addEpic();
        sprint.getEpic(childIndex).setTaskName(data.get('task-name'));
    } else if(child.parentNode.classList.contains('user-story')) {
        let currentEpic = sprint.getEpic(rowIdx);
        currentEpic.addUserStory();
        currentEpic.getUserStory(childIndex).setTaskName(data.get('task-name'));
    } else if(child.parentNode.classList.contains('subtask')) {
        let currentEpic = sprint.getEpic(rowIdx);
        currentEpic.addSubTask();
        currentEpic.getSubTask(childIndex).setTaskName(data.get('task-name'));
    } else {
        let currentEpic = sprint.getEpic(rowIdx);
        currentEpic.addOptionalTask();
        currentEpic.getOptionalTask(childIndex).setTaskName(data.get('task-name'));
    }

    console.log(sprint);
}