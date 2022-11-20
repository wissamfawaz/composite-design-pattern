const newTaskBtn = document.querySelector(".new-task");
const containerEl = document.querySelector(".container");
const undoBtn = document.querySelector(".undo");
const deleteBtn = document.querySelector(".delete");
const duckEl = document.querySelector(".no-task-img");
const projectScopeEl = document.querySelector(".project-scope");

var i = 2;

newTaskBtn.addEventListener("click", function(e) {
    checkEmpty();
    containerEl.innerHTML += 
    `
    <div class="path-module">
        <ul class="package milestone">
            <li class="task-module">Milestone ${i++}</li>
        </ul>
        <ul class="package task"></ul>
        <ul class="package subtask"></ul>
        <ul class="package optional"></ul>
    </div>
    `
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

function checkEmpty() {
    if(containerEl.childElementCount === 0) {
        duckEl.classList.toggle('invisible');
        projectScopeEl.classList.toggle('invisible');
    }
}