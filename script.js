
//make fetch request

async function logEmployees() {
    const response = await fetch("https://randomuser.me/api/?results=12&nat=us");
    const employeesData = await response.json();
    const results = employeesData.results;
    
    console.log(results);
    results.forEach(employee => {
        const mainContainer = document.querySelector('.group-container');
        const employeeCard = document.createElement('div');
        employeeCard.classList.add('employee-card');
        employeeCard.innerHTML = `<img src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}" class="employee-image">
        <h2 class="employee-name">${employee.name.first} ${employee.name.last}</h2>`;
    
        mainContainer.appendChild(employeeCard);
    });

  }

logEmployees();

//add employees to the page

