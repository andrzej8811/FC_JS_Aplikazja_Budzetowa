const d = document;
const qs = (selector) => d.querySelector(selector);
const incomeForm = qs("#incomeForm");
const incomesDOM = qs("#incomes");
const incomesTotalDOM = qs("#incomesTotal");
const outcomeForm = qs("#outcomeForm");
const outcomesDOM = qs("#outcomes");
const outcomesTotalDOM = qs("#outcomesTotal");

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

let outcomes = [
  // {
  //   id: 101,
  //   name: "name.value",
  //   amount: 100,
  // }
];
let outcomesTotal = 0;
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
    amount: Number(amount.value),
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

  

  // CONFIRM Input
  const confirmBtn = d.createElement("button");
  confirmBtn.textContent = "confirm";
  li.appendChild(confirmBtn);
  confirmBtn.addEventListener("click", (e) =>
    confirmEdit(li, id, nameInput, amountInput, deleteBtn, editBtn)
  );
};


// OUTCOME FUNCTIONS


const addOutcome = (e) => {
  e.preventDefault();
  const id = createId();
  const { name, amount } = e.currentTarget.elements;
  const newOutcome = {
    id,
    name: name.value;
    amount: Number(amount.value),
  };
  outcomes.push(newOutcome);
  viewRender();
viewRenderOutcomesTotal();
};

const editOutcome = (li, id name, amount, deleteBtn, editBTN) => {
  li.innerHTML = "";


  //Edit FORM OUTputs
  const nameOutput = d.createElement("output");
  const amountOutput = d.createElement("output");


  // set outputs to current (old) values
  nameOutput.value = name;
  amountOutput.value = amount;
  li.appendChild(nameOutput);
  li.appendChild(amountOutput);

// CONFIRM OUTPUT
const confirmBtn = d.createElement("button");
confirmBtn.textContent = "confirm";
li.appendChild(confirmBtn);
confirmBtn.addEventListener("click", (e) =>
  confirmEdit(li, id, nameOutput, amountOutput, deleteBtn, editBtn)
  );
};
}



//ConfirmEDit Input

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


//ConfirmEdit Output

const confirmEdit = (li, id, nameOutput, amountOutput, deleteBtn, editBtn) => {
  //get currency (new) values from output
  const newName = nameOutput.value;
  const newAmount = Number(amountOutcome.value);
  li.textContent = `(${id}) ${newName} :: ${newAmount}`;
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  outcomes = outcomes.map((outcome) =>
    outcome.id === id ? { ...outcome, name: newName, amount: newAmount } : outcome
  );
  viewRenderOutcomesTotal();

};



//add incomes to DOM

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

  // add one income to DOM
  incomesDOM.append(li);
};  

  // CREATE ENDS HERE

//add outcomes to DOM

const addOutcomeToDOM = ({ id, name, amount }) => {
  //CREATE OUTCOME
  const li = d.createElement("li");
  li.dataset.id = id;
  li.dataset,name = name;
  li.dataset.amount = amount;
  li.textContent = `(${id} ${name} :: ${amount})`;

  //Delete Outcomes

  const deleteBtn = d.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", (e) => deleteOutcome(li, id));
  li.appendChild(deleteBtn);

  //Edit Outcomes
  const editBtn = d.createElement("button");
  editBtn.textContent = "edit";
  editBtn.addEventListener("cilick", (e) => 
  editOutcome(li, id, name, amount, deleteBtn, editBtn)
  );
  li.appendChild(editBtn);

  //add one outcome to DOM
  outcomesDOM.append(li);

};



//Incomes
// VIEW
const viewRenderIncomesTotal = () => {
  incomesTotal = incomes.reduce((acc, i) => acc + i.amount, 0);
  incomesTotalDOM.textContent = `${incomesTotal}`;
};


//Outcomes
//View

const viewRenderOutcomesTotal = () => {
  outcomesTotal = outcomes.reduce((acc, i) => acc + i.amount, 0);
  outcomesTotalDOM.textContent = `${outcomesTotal}`;

};

//Incomes

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


//Outcomes
const viewRender = () => {
  //reset oitcomes to DOM
  outcomesDOM.innerHTML = "";
  //add all outcomes to DOM
  outcomes.forEach(addOutcomeToDOM);

};

//Event listener Outcomes
outcomeForm.addEventListener("submit", addOutcome);

//Render the app
viewRender();
viewRenderOutcomesTotal();
