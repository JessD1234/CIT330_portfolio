function saveBudget(item) {
    const budgetList = getBudgetList();
    budgetList.push(item);
    localStorage.setItem("budgetList", JSON.stringify(budgetList));
}

function getBudgetList() {
    const budgetString = localStorage.getItem("budgetList");
    let budgetList = [];
    if (budgetString) {
        budgetList = JSON.parse(budgetString);
    }
    return budgetList;
}

function deleteItem(id) {
    const budgetList = getBudgetList();
    const updatedBudget = budgetList.filter( item => item.id != id)
    localStorage.setItem("budgetList", JSON.stringify(updatedBudget));
}

export default {
 saveBudget,
 getBudgetList,
 deleteItem
}