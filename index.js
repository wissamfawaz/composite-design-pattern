const newTaskBtn = document.querySelector(".new-task");
const containerEl = document.querySelector(".container");
const undoBtn = document.querySelector(".undo");
const deleteBtn = document.querySelector(".delete");
const duckEl = document.querySelector(".no-task-img");
const projectSprintEl = document.querySelector(".project-sprint");
let packageEl  = document.querySelectorAll(".package");
let i = 2;

newTaskBtn.addEventListener("click", function(e) {
    checkEmpty();
    let wrapper = document.createElement("div");
    wrapper.classList.add("path-module");
    
    wrapper.insertAdjacentHTML("beforeend", 
    `
        <ul class="package epic">
            <li class="task-module">Epic ${i++}</li>
        </ul>
        <ul class="package user-story"></ul>
        <ul class="package subtask"></ul>
        <ul class="package optional"></ul>
    `);
    containerEl.appendChild(wrapper);
})

undoBtn.addEventListener("click", function(e) {
    containerEl.lastElementChild.remove();
    i--;
    checkEmpty();
})

deleteBtn.addEventListener("click", function(e) {
    while(containerEl.childElementCount > 0) {
        containerEl.lastElementChild.remove();
    }
    i = 1;
    if(duckEl.classList.contains('invisible'))
    checkEmpty();
})

containerEl.addEventListener("click", function(e) {
    if(e.target && e.target.matches("ul.package") && !e.target.classList.contains('milestone')) {

        // if(e.target.classList.contains('task') || path.ch)

        let wrapper = document.createElement("li");
        wrapper.classList.add('task-module');
        wrapper.textContent = "Untitled " + e.target.classList[1];
        e.target.appendChild(wrapper);
    }
})

function checkEmpty() {
    if(containerEl.childElementCount === 0) {
        duckEl.classList.toggle('invisible');
        projectSprintEl.classList.toggle('invisible');
    }
}

