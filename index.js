import {Task, MainTask, Milestone, Project} from "./composite.js";

//$ Constants and Variables

const newTaskBtn = document.querySelector(".new-task");
const containerEl = document.querySelector(".container");
const eraseBtn = document.querySelector(".erase");
const deleteBtn = document.querySelector(".delete");
const cancelFormBtn = document.querySelector(".cancel");
let deleteRowBtn = document.querySelectorAll(".fa-delete-left");

const packageLabelsEl = document.querySelector(".package-labels");
const duckEl = document.querySelector(".no-task-img");
const projectSprintEl = document.querySelector(".project-sprint");
const rightEl = document.querySelector(".right");
const middleEl = document.querySelector(".middle");
const formEl = document.getElementById("form");

let i = 2;

//$ Initiating the project
//feature backend
const project = new Project();

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

    //feature backend
    project.createMilestone();
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
        i = 1;
        if(duckEl.classList.contains("invisible"))
        checkEmpty();

        project.clearProject();
    }
})

//Create task
containerEl.addEventListener("click", function(e) {
    if(e.target && e.target.matches("ul.package") && !eraseBtn.classList.contains('erase-active')) {
        let wrapper = document.createElement("li");
        wrapper.classList.add('task-module');
        wrapper.textContent = "Untitled " + e.target.classList[1];
        e.target.appendChild(wrapper);

        visibleForm(e);

        //If cancel is clicked, remove the created task
        cancelFormBtn.addEventListener("click", function(){
            console.log(e.target);
            e.target.removeChild(wrapper);
        })

        //feature backend
        appendChild(identifyChild(e.target), );
        
    }
})

//Erase task
containerEl.addEventListener("click", function(e) {
    if(eraseBtn.classList.contains('erase-active') && e.target.matches("li.task-module")) {
        //feature backend
        identifyChild(e.target.parentNode);

        e.target.parentNode.removeChild(e.target);
    }
})

//Erase Path Module
containerEl.addEventListener("click", function(e) {
    if(eraseBtn.classList.contains('erase-active') && e.target.matches("i.fa-delete-left")) {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    }
    checkEmpty();
})

//When task is double-clicked open task form to input info
middleEl.addEventListener("dblclick", function(e) {
    if(e.target && (e.target.matches("li.task-module") || e.target.matches("div.project-sprint")) && !eraseBtn.classList.contains('erase-active')) {
        visibleForm(e);
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
    let text = "You are about to NUKE your whole SprintQuest. Are you sure?";
    return (confirm(text) == true);
}

//Makes the delete row buttons visible / invisible
function activateDeleteRows() 
{
    deleteRowBtn = document.querySelectorAll(".fa-delete-left");
    deleteRowBtn.forEach(deleteRowBtn => deleteRowBtn.classList.toggle('display'));
}

//Identifies the type of quest
function identifyChild(child) 
{
    if(child.classList.contains('epic')) {
        return('epic');
    } else if(child.classList.contains('user-story')) {
        return('user-story');
    } else if(child.classList.contains('subtask')) {
        return('subtask');
    } else {
        return('optional');
    }
}

//Appends the child to the corresponding composite
function appendChild(child, parent, idx) {

}

//Makes the form visible (display: block)
function visibleForm(e)
{
    rightEl.style.display = 'block';
}

//Gets the data from HTML form
function getData(e)
{
    e.stopImmediatePropagation();
    e.preventDefault();
    let data = new FormData(formEl);
    for (let [k, v] of data.entries()) { 
        console.log(k, v); 
    }
    return false;
}