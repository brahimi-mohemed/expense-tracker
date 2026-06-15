const OpenFormbtn = document.querySelector(".add-exp-btn")
const TotalExpenses = document.querySelector("#total-number")
const TransactionsNumber = document.querySelector("#transactions-number")
const HighestExpense = document.querySelector("#highest-exp")
const CategoriesNumber = document.querySelector("#categories-number")

const FilterSelect = document.querySelector("#filter-select")
const SortSelect = document.querySelector("#sort-select")
const SearchInput = document.querySelector("#search-txt")

const MsgTxt = document.querySelector("#msg-txt")
const ExpensesList = document.querySelector("ul")

const overlay = document.querySelector("#overlay")
const AddExpenseForm = document.querySelector("#form")
const CloseFormbtn = document.querySelector("#close-form-btn")
const DescInput = document.querySelector("#desc-txt")
const DescMsg = document.querySelector("#description-error")
const AmountInput = document.querySelector("#amount-txt")
const AmountMsg = document.querySelector("#amount-error")
const CategorySelect = document.querySelector("#category-select") 
const Submitbtn = document.querySelector("#submit-btn")

let stored_expenses = null

let editingID = null

document.addEventListener("DOMContentLoaded", LoadExpenses)

function LoadExpenses(){

    stored_expenses = JSON.parse(localStorage.getItem("expenses")) || []

    if (stored_expenses.length == 0){
        MsgTxt.textContent = "No Expenses Yet, Start Spending !"
        MsgTxt.style.display = "block"    
    }
    else {
        MsgTxt.textContent = ""
        MsgTxt.style.display = "none"
    }

    SearchInput.value = ""
    CalcStats(stored_expenses)
    SortExpenses()
    FilterSelect.value = "all"

}

function CalcStats(expenses){
    TotalExpenses.textContent = expenses.reduce((a, b ) => a + Number(b.amount) ,0) + " USD"
    TransactionsNumber.textContent = expenses.length
    HighestExpense.textContent = expenses.reduce((max, current) => Math.max(max, Number(current.amount)), 0) + " USD"
    CategoriesNumber.textContent = new Set(expenses.map(expense => expense.category)).size;
}

function OpenForm(){
    overlay.classList.add("active")
    AddExpenseForm.classList.add("active")

    setTimeout(() => DescInput.focus(), 50);
}

function CloseForm(){
    overlay.classList.remove("active")
    AddExpenseForm.classList.remove("active")

    DescInput.value = ""
    AmountInput.value = ""

    DescInput.classList.remove("error")
    AmountInput.classList.remove("error")

    DescMsg.textContent = ""
    AmountMsg.textContent =""
    
    Submitbtn.textContent = "Add Expense"
}

function SearchExpenses(){
    let searched_result = stored_expenses.filter(expense => expense.description.toLowerCase().includes(SearchInput.value.toLowerCase().trim()))

    if (!searched_result.length){
        MsgTxt.textContent = "No Search Result"
        MsgTxt.style.display = "block"
    }
    else{
        MsgTxt.textContent = ""
        MsgTxt.style.display = "none"
        
    }

    RenderExpenses(searched_result)
}

function SortExpenses(){

    let sorted_list = []

    switch (SortSelect.value) {
        
        case "newest" : 
        sorted_list = [...stored_expenses].sort((a, b) => b.id - a.id)
        break;
        
        case "oldest" : 
        sorted_list = [...stored_expenses].sort((a, b) => a.id - b.id)
        break;
        
        case "high" : 
        sorted_list = [...stored_expenses].sort((a, b) => Number(b.amount) - Number(a.amount))
        break;
        
        case "low" : 
        sorted_list = [...stored_expenses].sort((a, b) => Number(a.amount) - Number(b.amount))
        break;
        
        case "alpha" : 
        sorted_list = [...stored_expenses].sort((a, b) => a.description.localeCompare(b.description))
        break;
    }

    RenderExpenses(sorted_list)
}

function FilterExpenses(){
    
    let filtered_list = []

    if (FilterSelect.value == "all"){
        LoadExpenses()
    }
    else {
        filtered_list = stored_expenses.filter(expense => expense.category == FilterSelect.value)
        if(!filtered_list.length){
            MsgTxt.textContent = `You Have No Expenses In the ${FilterSelect.value} Category`
            MsgTxt.style.display = "block"             
        }
        RenderExpenses(filtered_list)
    }

}

function AddExpense(){

    const newdate = new Date()
    const time = newdate.getHours().toString().padStart(2, '0') + ":" + newdate.getMinutes().toString().padStart(2, '0') + ":" + newdate.getSeconds().toString().padStart(2, '0') + " " + newdate.getDate() + "/" + (newdate.getMonth() + 1) + "/" + newdate.getFullYear()
    const item_id = Date.now()

    stored_expenses.push({
        id : item_id,
        description : DescInput.value,
        amount : AmountInput.value,
        category : CategorySelect.value,
        date : time 
    })

    localStorage.setItem("expenses", JSON.stringify(stored_expenses))

    CloseForm()
    LoadExpenses()
}

function RemoveExpense(id){
    let updated_list = []

    updated_list = stored_expenses.filter((item) => item.id != id)

    localStorage.setItem("expenses", JSON.stringify(updated_list))

    LoadExpenses()
}

function HandleEdit(id){

    const item = stored_expenses.find(i => i.id == id)

    editingID = id
    Submitbtn.textContent = "Save"

    DescInput.value = item.description
    AmountInput.value = item.amount
    CategorySelect.value = item.category

    OpenForm()
    DescInput.focus()

}

function UpdateExpense(id){

    let updated_list = stored_expenses.map(expense => {
        if (expense.id == id){
            return {
                id : expense.id,
                description : DescInput.value,
                amount: AmountInput.value,
                category: CategorySelect.value,
                date : expense.date
            }
        }

        return expense
    })

    CloseForm()

    localStorage.setItem("expenses", JSON.stringify(updated_list))

    LoadExpenses()
}

function RenderExpenses(expenses){

    ExpensesList.innerHTML = ""

    expenses.forEach((expense) => {

        const expense_item = document.createElement("li")
        const item_name =  document.createElement("span")
        const item_category =  document.createElement("span")
        const item_amount =  document.createElement("span")
        const item_date =  document.createElement("span")
        const edit_btn = document.createElement("button")
        const del_btn = document.createElement("button")

        expense_item.className = "expense-item"
        expense_item.dataset.id = expense.id

        item_name.className = "item-name"
        item_name.textContent = expense.description

        item_category.className = "item-category"
        item_category.textContent = expense.category

        item_amount.className = "item-amount"
        item_amount.textContent = expense.amount + " USD"

        item_date.className = "item-date"
        item_date.textContent = expense.date

        edit_btn.className = "edit-btn"
        edit_btn.textContent = "Edit"
        
        del_btn.className = "del-btn"
        del_btn.textContent = "Delete"

        expense_item.append(item_name)
        expense_item.append(item_category)
        expense_item.append(item_amount)
        expense_item.append(item_date)
        expense_item.append(edit_btn)
        expense_item.append(del_btn)

        ExpensesList.append(expense_item)

    })
}

OpenFormbtn.addEventListener("click",OpenForm)

CloseFormbtn.addEventListener("click", CloseForm)
overlay.addEventListener("click", CloseForm)
document.addEventListener("keydown", (e) => {if(e.key == "Escape" ) CloseForm()})

DescInput.addEventListener("input", () => {
    DescInput.classList.remove("error")
    DescMsg.textContent = ""
})
DescInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        AmountInput.focus();
    }
});
AmountInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        CategorySelect.focus();
    }
});
CategorySelect.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        Submitbtn.click();
    }
});

AmountInput.addEventListener("input", () => {
    AmountInput.classList.remove("error")
    AmountMsg.textContent = ""
})

Submitbtn.addEventListener("click", () => {

    let isValid = true 

    if (!DescInput.value.trim()){
        DescMsg.textContent = "Description is required"
        DescInput.classList.add("error")
        isValid = false
    }
    
    if (!AmountInput.value.trim()){
        AmountMsg.textContent = "Amount Number is required"
        AmountInput.classList.add("error")
        isValid = false
    }

    if(!isValid) return;

    if (editingID){
        UpdateExpense(editingID)
        editingID = null
        Submitbtn.textContent = "Add Expense"
        
    }
    else {
        AddExpense()
    }
})

ExpensesList.addEventListener("click", (e) => {

    if (e.target.className == "del-btn"){
        RemoveExpense(e.target.parentElement.dataset.id)
        e.target.parentElement.remove()
    }

    else if (e.target.className == "edit-btn") {
        HandleEdit(e.target.parentElement.dataset.id)
    }
})

SearchInput.addEventListener("input",SearchExpenses)
SortSelect.addEventListener("change",SortExpenses)
FilterSelect.addEventListener("change",FilterExpenses)