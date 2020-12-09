import toggle from "./toggle.js";
import math from "./math.js";
import ls from "./ls.js";

//Global Elements

//Sidebar items
const topBalance = document.getElementById("topBalance");
const topIncome = document.getElementById("topIncome");
const topExpenses = document.getElementById("topExpenses");

//Tabs where the lists are stored
const incomeTab = document.querySelector("#income");
const expenseTab = document.querySelector("#expenses");
const allTab = document.querySelector("#all")

//The individual lists
const expenseList = document.querySelector(".expensesList");
const incomeList = document.querySelector(".incomeList");
const allList = document.querySelector(".allList");

//Update Buttons
const expenseBtn = document.getElementById("exButton");
const incomeBtn = document.getElementById("inButton");
const allBtn = document.getElementById("allButton");

//Event Listeners and Onclicks
document.getElementById("incomeAdd").onclick = createIncome;
document.getElementById("expensesAdd").onclick = createExpense;
document.querySelector("#resetButton").onclick = resetButton;


//Reset the whole budget and clear local storage 
function resetButton () {
    const confirmBox = confirm("Are you sure you want to clear the budget? This cannot be undone!");

    if (confirmBox == true) {
    localStorage.clear();
    }
    else {
        return;
    }
    incomeList.innerHTML = '';
    expenseList.innerHTML = '';
    allList.innerHTML = '';
    topBalance.innerHTML = '';
    topIncome.innerHTML = '';
    topExpenses.innerHTML = '';

}

//Load previously stored budget items once the page is opened.
document.addEventListener("DOMContentLoaded", loadBudget());

function loadBudget() {
    const budgetList = ls.getBudgetList();

    budgetList.forEach(item => {
        loadAllList(allList, item.type, item.title, item.amount, item.id);
        if (item.type == "income") {
            buildEntry(incomeList, item.type, item.title, item.amount, item.id);
        }
        else {
            buildEntry(expenseList, item.type, item.title, item.amount, item.id);
        }
        
    })
    math.updateTop();
}

//Update visible tab and button appearances

expenseBtn.addEventListener('click', function() {
    toggle.activeButton(expenseBtn);
    toggle.inactiveButton([incomeBtn, allBtn]);
    toggle.showTab(expenseTab);
    toggle.hideTab([incomeTab, allTab]);

})

incomeBtn.addEventListener('click', function() {
    toggle.activeButton(incomeBtn);
    toggle.inactiveButton([expenseBtn, allBtn]);
    toggle.showTab(incomeTab);
    toggle.hideTab([expenseTab, allTab]);

})

allBtn.addEventListener('click', function() {
    toggle.activeButton(allBtn);
    toggle.inactiveButton([incomeBtn, expenseBtn]);
    toggle.showTab(allTab);
    toggle.hideTab([incomeTab, expenseTab]);

})

//Add new income item.
function createIncome() {
    const title = document.querySelector("#incomeTitle");
    const amount = document.querySelector("#incomeAmount");
    const incomeList = document.querySelector(".incomeList");
    const allList = document.querySelector(".allList");
    if (!title.value || !amount.value ) return;
    let income = {
        type: "income",
        title: title.value,
        amount: parseFloat(amount.value),
        id: Date.now()
    }
    buildEntry(incomeList, income.type, income.title, income.amount, income.id);
    loadAllList(allList, income.type, income.title, income.amount, income.id);
    title.value = ' ';
    amount.value = ' ';
    ls.saveBudget(income);
    math.updateTop();
}

//Add new expense item.
function createExpense() {
    const title = document.querySelector("#expensesTitle");
    const amount = document.querySelector("#expensesAmount")

    if (!title.value || !amount.value ) return;
    let expense = {
        type: "expense",
        title: title.value,
        amount: parseFloat(amount.value),
        id: Date.now()
    }

    buildEntry(expenseList, expense.type, expense.title, expense.amount, expense.id);
    loadAllList(allList, expense.type, expense.title, expense.amount, expense.id);
    title.value = ' ';
    amount.value = ' ';
    ls.saveBudget(expense);
    math.updateTop();
   
}

// Build new budget item HTML and add it to the budget
function buildEntry (list, type, title, amount, id) {
    var amountDisplay = amount.toFixed(2);
    const entry =  `<div id="${id}" class="${type}">
                      <div class="entry">${title}:</div>
                      <div id="amount">$${amountDisplay}</div>
                      <div id="edit" data-id="${id}">Edit</div>
                      <div id="delete" data-id="${id}">Delete</div>
                   </div>`;
  
      const position = "afterbegin";
  
      list.insertAdjacentHTML(position, entry);
  }

// Load 'all list' 
function  loadAllList(list, type, title, amount, id) {
    var amountDisplay = amount.toFixed(2);
    const entry =  `<div id="${id}" class="${type}">
                      <div class="entry">${title}: </div>
                      <div id="amount">$${amountDisplay}</div>
                      <div id="delete" data-id="${id}">Delete</div>
                   </div>`;
  
      const position = "afterbegin";
  
      list.insertAdjacentHTML(position, entry);
  }

//Edit and delete functions
incomeTab.addEventListener("click", deleteOrEdit);
expenseTab.addEventListener("click", deleteOrEdit);
allTab.addEventListener("click", deleteOrEdit);

function deleteOrEdit(event) {
    const targetBtn = event.target;
    const budgetList = ls.getBudgetList();
    const buttonId = targetBtn.getAttribute('data-id');

    if(targetBtn.id == "delete") {
        deleteEntry(budgetList, buttonId);
    } else if(targetBtn.id == "edit") {
        editEntry(budgetList, buttonId);
    }
}

function deleteEntry(budgetList, buttonId) {
    const updatedBudget = budgetList.filter( entry => entry.id != buttonId)
    localStorage.setItem("budgetList", JSON.stringify(updatedBudget));

    incomeList.innerHTML = '';
    expenseList.innerHTML = '';
    allList.innerHTML = '';
    topBalance.innerHTML = '';
    topIncome.innerHTML = '';
    topExpenses.innerHTML = '';
    loadBudget();
}

function editEntry(budgetList, buttonId) {
        
    const incomeTitle = document.querySelector("#incomeTitle");
    const incomeAmount = document.querySelector("#incomeAmount");
    const expenseTitle = document.querySelector("#expensesTitle");
    const expenseAmount = document.querySelector("#expensesAmount");

    var i = 0; 
    for(i in budgetList) {
        if(budgetList[i].id == buttonId && budgetList[i].type == "income") {
                incomeTitle.value = budgetList[i].title;
                incomeAmount.value = budgetList[i].amount;
                deleteEntry(budgetList, buttonId);
                break
            } else if(budgetList[i].id == buttonId && budgetList[i].type == "expense") {
                expenseTitle.value = budgetList[i].title;
                expenseAmount.value = budgetList[i].amount;
              deleteEntry(budgetList, buttonId);
                break
            }
        }
}