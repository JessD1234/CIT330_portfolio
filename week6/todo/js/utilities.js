function activeFilter(todos) {
    return todos.filter( todo => {
        return !todo.completed
    })
}

function unfinishedFilter(todos) {
    return todos.filter( todo => {
        return todo.completed
    })
}

export default {
    activeFilter,
    unfinishedFilter
}