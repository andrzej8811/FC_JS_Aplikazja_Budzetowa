const d = document;
const qs = (selector) => d.querySelector(selector);
const incomeForm = qs("#incomeForm");
const incomesDOM = qs("#incomes");
const incomesTotalDOM = qs("#incomesTotal");

// DATA / MODEL
let incomes = [
  // {
  //   id: 101,
  //   name: "name.value",
  //   amount: 100,
  // }
];
let incomesTotal = 0;
let nextId = 0;

// UTILITIES FUNCTIONS
const createId = () => {
  nextId++;
  return nextId;
};

// INCOME FUNCTIONS

const addIncome = (e) => {
  e.preventDefault();
  const id = createId();
  const { name, amount } = e.currentTarget.elements;
  const newIncome = {
    id,
    name: name.value,
    amount: Number(amount.value)
  };
  incomes.push(newIncome);
  viewRender();
  viewRenderIncomesTotal();
};

const deleteIncome = (li, id) => {
  // set incomes to all incomes minus the deleted one
  incomes = incomes.filter((income) => income.id !== id);
  li.remove();
  viewRenderIncomesTotal();
};

const editIncome = (li, id, name, amount, deleteBtn, editBtn) => {
  li.innerHTML = "";

  // EDIT FORM
  const nameInput = d.createElement("input");
  const amountInput = d.createElement("input");
  // set inputs to current (old) values
  nameInput.value = name;
  amountInput.value = amount;
  li.appendChild(nameInput);
  li.appendChild(amountInput);

  // CONFIRM
  const confirmBtn = d.createElement("button");
  confirmBtn.textContent = "confirm";
  li.appendChild(confirmBtn);
  confirmBtn.addEventListener("click", (e) =>
    confirmEdit(li, id, nameInput, amountInput, deleteBtn, editBtn)
  );
};

const confirmEdit = (li, id, nameInput, amountInput, deleteBtn, editBtn) => {
  // get current (new) values from inputs
  const newName = nameInput.value;
  const newAmount = Number(amountInput.value);
  li.textContent = `(${id}) ${newName} :: ${newAmount}`;
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  incomes = incomes.map((income) =>
    income.id === id ? { ...income, name: newName, amount: newAmount } : income
  );
  viewRenderIncomesTotal();
};

const addIncomeToDOM = ({ id, name, amount }) => {
  // CREATE
  const li = d.createElement("li");
  li.dataset.id = id;
  li.dataset.name = name;
  li.dataset.amount = amount;
  li.textContent = `(${id}) ${name} :: ${amount}`;

  // DELETE
  const deleteBtn = d.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", (e) => deleteIncome(li, id));
  li.appendChild(deleteBtn);

  // EDIT
  const editBtn = d.createElement("button");
  editBtn.textContent = "edit";
  editBtn.addEventListener("click", (e) =>
    editIncome(li, id, name, amount, deleteBtn, editBtn)
  );
  li.appendChild(editBtn);

  // CREATE ENDS HERE
  // add one income to DOM
  incomesDOM.append(li);
};

// VIEW
const viewRenderIncomesTotal = () => {
  incomesTotal = incomes.reduce((acc, i) => acc + i.amount, 0);
  incomesTotalDOM.textContent = `${incomesTotal}`;
};

const viewRender = () => {
  // reset incomes in DOM
  incomesDOM.innerHTML = "";
  // add all incomes to DOM
  incomes.forEach(addIncomeToDOM);
};

// EVENT LISTENERS
incomeForm.addEventListener("submit", addIncome);

// render the App
viewRender();
viewRenderIncomesTotal();
