
function activeButton (element) {
    element.classList.add("active");
}

function inactiveButton (elementsArray) {
    elementsArray.forEach(element => {
        element.classList.remove("active");
    })
}

function showTab (element) {
    element.classList.remove("hide");
}

function hideTab (elementsArray) {
    elementsArray.forEach(element => {
        element.classList.add("hide")
    })
    
}

export default {
    activeButton,
    inactiveButton,
    showTab,
    hideTab
}