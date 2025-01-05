class Employee {
    constructor(name, email, phone, job) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.job = job;
        this.id = Math.floor(Math.random() * 1000);
    }
}

function showEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employeesTable = document.getElementById('employees');
    employeesTable.innerHTML = '';
    employees.forEach(emp => {
        employeesTable.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.phone}</td>
                <td>${emp.job}</td>
                <td>
                    <button onclick="editEmployee(${emp.id})">Edit</button>
                    <button onclick="deleteEmployee(${emp.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function addEmployee() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const job = document.getElementById('job').value;
    
    if (!name || !email || !phone || !job) {
        alert('All fields are required.');
        return;
    }

    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const isDuplicate = employees.some(emp => emp.phone === phone);

    if (isDuplicate) {
        alert('Employee with this phone number already exists.');
        return;
    }

    const newEmployee = new Employee(name, email, phone, job);
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));
    alert('Employee added successfully.');
    document.querySelectorAll('input').forEach(input => input.value = '');
}

function editEmployee(id) {
    const employees = JSON.parse(localStorage.getItem('employees'));
    const emp = employees.find(emp => emp.id === id);
    localStorage.setItem('currentEmployee', JSON.stringify(emp));
    window.location.href = 'index.html';
}

function deleteEmployee(id) {
    let employees = JSON.parse(localStorage.getItem('employees'));
    employees = employees.filter(emp => emp.id !== id);
    localStorage.setItem('employees', JSON.stringify(employees));
    showEmployees();
}

if (window.location.pathname.includes('index.html')) {
    const currentEmployee = JSON.parse(localStorage.getItem('currentEmployee'));
    if (currentEmployee) {
        document.getElementById('name').value = currentEmployee.name;
        document.getElementById('email').value = currentEmployee.email;
        document.getElementById('phone').value = currentEmployee.phone;
        document.getElementById('job').value = currentEmployee.job;
        localStorage.removeItem('currentEmployee');
    }
}
