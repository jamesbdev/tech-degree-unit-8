
//make fetch request

async function logEmployees() {
    const response = await fetch("https://randomuser.me/api/?results=12&nat=us");
    const employeesData = await response.json();
    const results = employeesData.results;
 
    
    results.forEach(employee => {
        const mainContainer = document.querySelector('.group-container');
        const employeeCard = document.createElement('div');
        employeeCard.classList.add('employee-card');
        const employeeImage = employee.picture.large;
        const employeeName = `${employee.name.first} ${employee.name.last}`;
        const employeeEmail = employee.email;
        const employeeCity = employee.location.city;
        const employeePhone = employee.phone;
        const employeeAddress = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;
        employeeCard.innerHTML = `<img src="${employeeImage}" alt="${employeeName}" class="employee-image">
        <div class="employee-info">
        <h2 class="employee-name">${employeeName}</h2>
        <p class="employee-email">${employeeEmail}</p>
        <p class="employee-city">${employeeCity}</p></div>`;
    
        mainContainer.appendChild(employeeCard);

        //create modal
        const createModal = (image, name) => {
            const modal = document.createElement('div');
            const body = document.querySelector('body');
            modal.classList.add('modal');
            modal.setAttribute('id', 'modal-${employeeName}');
            modal.innerHTML = `<div class="modal-content">
            <img src="${employeeImage}" alt="${employeeName}" class="modal-image">
            <h2>${employeeName}</h2>
            <p>${employeeEmail}</p>
            <p>${employeeCity}</p>
            <hr>
            <p>${employeePhone}</p>
            <p>${employeeAddress}</p>
            <p>Birthday: ${employee.dob.date}</p>
            </div>`;
            //append to DOM
            body.appendChild(modal);
        }

        createModal(employeeImage, employeeName);
       
    });

   

  }

logEmployees();

const employeeCards = document.querySelectorAll('.employee-card');
const container = document.querySelector('.group-container');

// const createModal = (image, firstName, lastName, email, city, phone, address) => {
//     const modal = document.createElement('div');
//     modal.classList.add('modal');
//     modal.innerHTML = `<div class="modal-content">
//     <span class="close">&times;</span>
//     <img src="${image}" alt="${firstName}" class="modal-image">
//     <div class="modal-info">
//     <h2 class="modal-name">${firstName}</h2>
//     <p class="modal-email">${email}</p>
//     <p class="modal-city">${city}</p></div>`;
//     document.body.appendChild(modal);
// }

container.addEventListener('click', (e) => {
  //display the modal when the card is clicked
  console.log(e.target);
  const modal = document.querySelectorAll('.modal')[0];
  modal.style.display = 'block';
});
