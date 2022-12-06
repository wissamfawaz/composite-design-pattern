import {Task, Epic, UserStory, Sprint} from "./composite.js";

//$ Constants and Variables

const newTaskBtn = document.querySelector(".new-task");
const containerEl = document.querySelector(".container");
const eraseBtn = document.querySelector(".erase");
const deleteBtn = document.querySelector(".delete");
const cancelFormBtn = document.querySelector(".cancel");
const saveQuestBtn = document.querySelector(".save");
const saveFormBtn = document.querySelector(".submit");
let deleteRowBtn = document.querySelectorAll(".fa-delete-left");

const packageLabelsEl = document.querySelector(".package-labels");
const duckEl = document.querySelector(".no-task-img");
const projectSprintEl = document.querySelector(".project-sprint");
const rightEl = document.querySelector(".right");
const middleEl = document.querySelector(".middle");
const formEl = document.getElementById("form");
const taskNameEl = document.querySelector(".task-name");
const recipientsEl = document.querySelector(".recipients");
const startDateEl = document.querySelector(".start-date");
const dueDateEl = document.querySelector(".due-date");
const budgetEl = document.querySelector(".budget");
const addNotesEl = document.querySelector(".add-notes");
const scrumMasterEl = document.querySelector(".scrum-master");
const productOwnerEl = document.querySelector(".product-owner");

const scrumMasterFromLocal = localStorage.getItem("Scrum Master");
const productOwnerFromLocal = localStorage.getItem("Product Owner");

//$ Initiating the project
//feature backend
const sprint = new Sprint();
checkEmpty();

if(scrumMasterFromLocal)
scrumMasterEl.value = JSON.parse(scrumMasterFromLocal);

if(productOwnerFromLocal)
productOwnerEl.value = JSON.parse(productOwnerFromLocal);

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
        <ul class="package epic"></ul>
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

// Saves SprintQuest to local storage
saveQuestBtn.addEventListener("click", function(){
    localStorage.setItem("SprintQuest", JSON.stringify(sprint));
    alert("Saved Successfully!");
    localStorage.setItem("Scrum Master", JSON.stringify(scrumMasterEl.value));
    localStorage.setItem("Product Owner", JSON.stringify(productOwnerEl.value));

    sprint.setProductOwner(JSON.parse(localStorage.getItem("Product Owner")));
    sprint.setScrumMaster(JSON.parse(localStorage.getItem("Scrum Master")));

});

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

//Nuke SprintQuest canvas
deleteBtn.addEventListener("click", function(e) {
    if(confirmDelete()){
        while(containerEl.childElementCount > 0 && !containerEl.lastElementChild.matches("div.package-labels")) {
            containerEl.lastElementChild.remove();
        }
        if(duckEl.classList.contains("invisible"))
        checkEmpty();

        sprint.clearSprint();
        projectSprintEl.textContent = "Untitled SprintQuest";
        console.log(sprint)
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

//Erase task
containerEl.addEventListener("click", function(e) {
    if(eraseBtn.classList.contains('erase-active') && e.target.matches("li.task-module")) {
        deleteFromBackend(e.target, getChildIndex(e.target));
        e.target.parentNode.removeChild(e.target);
    }
})

//Erase Path Module
containerEl.addEventListener("click", function(e) {
    if(eraseBtn.classList.contains('erase-active') && e.target.matches("i.fa-delete-left")) {
        sprint.deleteEpic(getChildIndex(e.target.parentNode)-1);
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    }
    checkEmpty();
})

//When task is double-clicked open task form to input info
middleEl.addEventListener("dblclick", async function(e) {
    let target = e.target;
    if(target && (target.matches("li.task-module") || target.matches("div.project-sprint")) && !eraseBtn.classList.contains('erase-active')) {
        toggleForm(true);
        updateFormData(target, getChildIndex(e.target));
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
            .then(() => {return saveChild(wrapper, getData(e), getChildIndex(wrapper));}, () => {target.removeChild(wrapper);});
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

// Deletes task from UI
function deleteTask(child) 
{
    let parent = child.parentNode;
    parent.removeChild(child);
}

// fetches data from the backend and updates the form 
function updateFormData(child, childIndex) 
{
    let rowIdx = Array.from(child.parentNode.parentNode.parentNode.children).indexOf(child.parentNode.parentNode) -1;

    let currentElement;
    if(child.parentNode.classList.contains('epic')) {
        currentElement = sprint.getEpic(rowIdx);
    } else if(child.parentNode.classList.contains('user-story')) {
        currentElement = sprint.getEpic(rowIdx).getUserStory(childIndex);
    } else if(child.parentNode.classList.contains('subtask')) {
        currentElement = sprint.getEpic(rowIdx).getSubTask(childIndex);
    } else if(child.parentNode.classList.contains('optional')) {
        currentElement = sprint.getEpic(rowIdx).getOptionalTask(childIndex);
    } else if(child.classList.contains('project-sprint')) {
        currentElement = sprint;
    }

    if(currentElement.getTaskName() != undefined && currentElement.getRecipients() != undefined && currentElement.getDescription() != undefined) {
        taskNameEl.value = currentElement.getTaskName();
        recipientsEl.value = currentElement.getRecipients();
        startDateEl.value = currentElement.getStartDate();
        dueDateEl.value = currentElement.getDueDate();
        budgetEl.value = currentElement.getBudget();
        addNotesEl.value = currentElement.getDescription();
    }
}

// Deletes task from backend
function deleteFromBackend(child, childIndex)
{
    let rowIdx = Array.from(child.parentNode.parentNode.parentNode.children).indexOf(child.parentNode.parentNode) -1;

    if(child.parentNode.classList.contains('epic')) {sprint.deleteEpic(childIndex)};
    if(child.parentNode.classList.contains('user-story')) {sprint.getEpic(rowIdx).deleteUserStory(childIndex)};
    if(child.parentNode.classList.contains('subtask')) {sprint.getEpic(rowIdx).deleteSubTask(childIndex)};
    if(child.parentNode.classList.contains('optional')) {sprint.getEpic(rowIdx).deleteOptionalTask(childIndex)}; 

    console.log(sprint);
}

//Appends children to the corresponding composite
function saveChild(child, data, childIndex) {
    let rowIdx = Array.from(child.parentNode.parentNode.parentNode.children).indexOf(child.parentNode.parentNode) -1;
    updateQuestName(child, data);

    let currentElement;
    if(child.parentNode.classList.contains('epic')) {
        if(sprint.getEpic(rowIdx) == undefined)
        sprint.addEpic();
        currentElement = sprint.getEpic(rowIdx);
    } else if(child.parentNode.classList.contains('user-story')) {
        let currentEpic = sprint.getEpic(rowIdx);
        try {
            if(currentEpic.getUserStory(childIndex) == undefined)
            currentEpic.addUserStory();
            currentElement = currentEpic.getUserStory(childIndex);
        } catch(err) {
            alert('Create an epic first!');
            deleteTask(child);
        }
    } else if(child.parentNode.classList.contains('subtask')) {
        let currentEpic = sprint.getEpic(rowIdx);
        try {
            if(currentEpic.getSubTask(childIndex) == undefined)
            currentEpic.addSubTask();
            currentElement = currentEpic.getSubTask(childIndex);
        } catch(err) {
            alert('Create an epic or user story first!');
            deleteTask(child);
        }
    } else if(child.parentNode.classList.contains('optional')){
        let currentEpic = sprint.getEpic(rowIdx);
        try {
            if(currentEpic.getOptionalTask(childIndex) == undefined)
            currentEpic.addOptionalTask();
            currentElement = currentEpic.getOptionalTask(childIndex);
        } catch(err) {
            alert('Create an epic or user story first!');
            deleteTask(child);
        }
    } else if(child.classList.contains('project-sprint')){
        currentElement = sprint;
    }

    try {
        currentElement.setTaskName(data.get('task-name'));
        currentElement.setRecipients(data.get('recipients'));
        currentElement.setStartDate(data.get('start-date'));
        currentElement.setDueDate(data.get('due-date'));
        currentElement.setBudget(data.get('budget'));
        currentElement.setDescription(data.get('add-notes'));
    } catch(e) {}
    console.log(sprint);
}

