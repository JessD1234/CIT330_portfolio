import ls from "./ls.js";

const topBalance = document.getElementById("topBalance");
const topIncome = document.getElementById("topIncome");
const topExpenses = document.getElementById("topExpenses");

function updateTop() {
    const budgetList = ls.getBudgetList();
    var income = calculateTotal("income", budgetList);
    var expenses = calculateTotal("expense", budgetList);
    var balance = calculateBalance(income, expenses)
    var balanceDisplay = balance.toFixed(2);
    var expensesDisplay = expenses.toFixed(2);
    var incomeDisplay = income.toFixed(2);
    topBalance.innerHTML = "$" + balanceDisplay;
    topIncome.innerHTML = "$" + incomeDisplay;
    topExpenses.innerHTML = "$" + expensesDisplay;
    if (balance < 0) {
        topBalance.classList.add('red');
    } else {
        topBalance.classList.remove('red');
    }
}

function calculateTotal(type, budgetList) {
    let sum = 0;

    budgetList.forEach( item => {
        if(item.type == type) {
            sum += item.amount;
        }
    })
    topIncome.innerHTML = sum;
   return sum;
}

function calculateBalance(income, expenses) {

    const balance = income - expenses;
    return balance;
}

export default {
   updateTop    
}