// Массив для хранения данных о департаментах
let departments = [];

// Получение элементов из DOM
const form = document.getElementById("departmentForm");
const recordSelect = document.getElementById("recordSelect");
const output = document.getElementById("output");

// Кнопки
const addRecordButton = document.getElementById("addRecord");
const clearFormButton = document.getElementById("clearForm");
const deleteRecordButton = document.getElementById("deleteRecord");
const showAllButton = document.getElementById("showAll");
const showManagersButton = document.getElementById("showManagers");
const addPropertyButton = document.getElementById("addProperty");

// Добавление записи
addRecordButton.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const manager = document.getElementById("manager").value;
  const phone = document.getElementById("phone").value;
  const employees = document.getElementById("employees").value;
  const address = document.getElementById("address").value;

  const newRecord = {
    id: Date.now(),
    name,
    manager,
    phone,
    employees: +employees,
    address,
  };
  departments.push(newRecord);
  updateSelect();
  clearForm();
  alert("Record added!");
});

// Очистка формы
clearFormButton.addEventListener("click", () => clearForm());

function clearForm() {
  form.reset();
}

// Обновление выпадающего списка
function updateSelect() {
  recordSelect.innerHTML = `<option value="">Select a record</option>`;
  departments.forEach((dep) => {
    const option = document.createElement("option");
    option.value = dep.id;
    option.textContent = dep.name;
    recordSelect.appendChild(option);
  });
}

// Удаление записи
deleteRecordButton.addEventListener("click", () => {
  const selectedId = recordSelect.value;
  if (!selectedId) {
    alert("Please select a record to delete!");
    return;
  }
  departments = departments.filter((dep) => dep.id != selectedId);
  updateSelect();
  alert("Record deleted!");
});

// Показать все записи
showAllButton.addEventListener("click", () => {
  output.innerHTML = "<h3>All Records:</h3>";
  departments.forEach((dep) => {
    output.innerHTML += `<p>${JSON.stringify(dep)}</p>`;
  });
});

// Показать менеджеров с max/min сотрудниками
showManagersButton.addEventListener("click", () => {
  if (departments.length === 0) {
    alert("No records available!");
    return;
  }
  const maxEmployees = Math.max(...departments.map((dep) => dep.employees));
  const minEmployees = Math.min(...departments.map((dep) => dep.employees));

  const maxManager = departments.find(
    (dep) => dep.employees === maxEmployees
  ).manager;
  const minManager = departments.find(
    (dep) => dep.employees === minEmployees
  ).manager;

  output.innerHTML = `<p>Manager with max employees: ${maxManager}</p>`;
  output.innerHTML += `<p>Manager with min employees: ${minManager}</p>`;
});

// Добавление нового свойства
addPropertyButton.addEventListener("click", () => {
  const newProperty = document.getElementById("newProperty").value;
  if (!newProperty) {
    alert("Enter a property name!");
    return;
  }
  departments.forEach((dep) => (dep[newProperty] = null));
  alert(`Property "${newProperty}" added to all records!`);
});
