//find the needed elements
const list = document.getElementById("list");
const input = document.getElementById("input");

// class names

const CHECK = "done-style";
const UNCHECK = "not-done-style"

// add new to-do item

function addToDo (newItem) {
    const item = `
                <li class="list-item">
                    <div class="not-done-style inline" job="complete" id="0"></div>
                    <p class="text">${newItem}</p>
                    <div class="trash inline" job="delete" id="0"></div>
                </li>
                `;
    const position = "beforeend";
    list.insertAdjacentElement(position, item);
}

addToDo("Swim!");

function alertuser() {
    alert("Hi");
}