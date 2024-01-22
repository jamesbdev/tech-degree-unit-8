
//make fetch request

async function logEmployees() {
    //make fetch request
    const response = await fetch("https://randomuser.me/api/?results=12&nat=us");
    const employeesData = await response.json();
    //store results in a variable
    const results = employeesData.results;
    

    results.forEach(employee => {
        const mainContainer = document.querySelector('.group-container');
        const employeeCard = document.createElement('div');
        //add class to employee card
        employeeCard.classList.add('employee-card');
        //store variables from the data request
        const employeeImage = employee.picture.large;
        const employeeName = `${employee.name.first} ${employee.name.last}`;
        const employeeEmail = employee.email;
        const employeeCity = employee.location.city;
        const employeePhone = employee.phone;
        const employeeAddress = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;
        //create the HTML for the employee card
        employeeCard.innerHTML = `<img src="${employeeImage}" alt="${employeeName}" class="employee-image">
        <div class="employee-info">
        <h2 class="employee-name">${employeeName}</h2>
        <p class="employee-email">${employeeEmail}</p>
        <p class="employee-city">${employeeCity}</p></div>`;
        
        //append the employee card to the DOM
        mainContainer.appendChild(employeeCard);

        //create modal
        const createModal = (image, name) => {
            const modal = document.createElement('div');
            const body = document.querySelector('body');
            modal.classList.add('modal');
            modal.setAttribute('id', 'modal-${employeeName}');
            modal.innerHTML = `<div class="modal-content"><span class="modal-close">&times;</span>
            <div>
            <img src="${employeeImage}" alt="${employeeName}" class="modal-image">
            </div>
   
            <div class="modal-info">
            <h2>${employeeName}</h2>
            <p>${employeeEmail}</p>
            <p>${employeeCity}</p>
            </div>
            <hr>
            <div class="modal-info">
            <p>${employeePhone}</p>
            <p>${employeeAddress}</p>
            <p>Birthday: ${employee.dob.date}</p>
            </div>
            </div>`;
            //append to DOM
            body.appendChild(modal);
            
        }
        //instantiate modal
        createModal(employeeImage, employeeName);
       
    });
  }

logEmployees();

const employeeCards = document.querySelectorAll('.employee-card');
const container = document.querySelector('.group-container');


container.addEventListener('click', (e) => {
  //display the modal when the card is clicked
  console.log(e.target);
  const modal = document.querySelectorAll('.modal')[0];
  modal.style.display = 'block';
});

const closeModal = () => {
  const closeIcon = document.querySelectorAll('modal-close');
    closeIcon.addEventListener('click', (event) => {
        const modal = document.querySelectorAll('.modal')[0];
        modal.style.display = 'none';
    });
}

const modal = document.querySelectorAll('.modal');

modal.forEach(modal => {
    modal.addEventListener('click', (event) => {
        console.log(event.target);
})
});
