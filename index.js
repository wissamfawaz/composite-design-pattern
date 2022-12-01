//$ Constants and Variables

const newTaskBtn = document.querySelector(".new-task");
const containerEl = document.querySelector(".container");
const eraseBtn = document.querySelector(".erase");
const deleteBtn = document.querySelector(".delete");
const duckEl = document.querySelector(".no-task-img");
const projectSprintEl = document.querySelector(".project-sprint");
const rightEl = document.querySelector(".right");
let packageEl  = document.querySelectorAll(".package");
let i = 2;

//$ Event Listeners

newTaskBtn.addEventListener("click", function(e) {
    checkEmpty();
    let wrapper = document.createElement("div");
    wrapper.classList.add("path-module");
    
    wrapper.insertAdjacentHTML("beforeend", 
    `
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
})

eraseBtn.addEventListener("click", function(e) {
    eraseBtn.classList.toggle("erase-active");
    checkEmpty();
})

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

containerEl.addEventListener("click", function(e) {
    if(e.target && e.target.matches("ul.package") && !eraseBtn.classList.contains('erase-active')) {
        let wrapper = document.createElement("li");
        wrapper.classList.add('task-module');
        wrapper.textContent = "Untitled " + e.target.classList[1];
        e.target.appendChild(wrapper);
    }
})

containerEl.addEventListener("click", function(e) {
    if(eraseBtn.classList.contains('erase-active') && e.target.matches("li.task-module")) {
        e.target.classList.add('toRemove');
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

