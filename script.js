
//make fetch request

async function logEmployees() {
    //make fetch request
    const response = await fetch("https://randomuser.me/api/?results=12&nat=us");
    const employeesData = await response.json();
    //store results in a variable
    const results = employeesData.results;
    //loop through employee data
    results.forEach((employee, index) => {
        const mainContainer = document.querySelector('.group-container');
        const employeeCard = document.createElement('div');
        //add class to employee card
        employeeCard.classList.add('employee-card');
        employeeCard.setAttribute('data-index', index);
        //store variables from the data request
        const employeeImage = employee.picture.large;
        const employeeName = `${employee.name.first} ${employee.name.last}`;
        const employeeEmail = employee.email;
        const employeeCity = employee.location.city;
        const employeePhone = employee.phone;
        const employeeAddress = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;
        //create the HTML for the employee card

        const createCard = (image, name, email, city) => {
            employeeCard.innerHTML = `
            <img src="${image}" alt="${name}" class="employee-image">
            <div class="employee-info">
                <h2 class="employee-name">${name}</h2>
                <p class="employee-email">${email}</p>
                <p class="employee-city">${city}</p>
            </div>`;
        }
        //instantiate the card
        createCard(employeeImage, employeeName, employeeEmail, employeeCity);
      
        //append the employee card to the DOM
        mainContainer.appendChild(employeeCard);

        //create modal
        const createModal = (image, name, index) => {
            const modal = document.createElement('div');
            const body = document.querySelector('body');
            modal.classList.add('modal');
            modal.setAttribute('data-index', index);
            modal.innerHTML = `
            <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div>
              <img src="${employeeImage}" alt="${employeeName}" class="modal-image">
            </div>
            <div class="modal-info">
              <h2>${employeeName}</h2>
              <p>${employeeEmail}</p>
              <p>${employeeCity}</p>
            <hr>
            <p>${employeePhone}</p>
            <p>${employeeAddress}</p>
            <p>Birthday: ${employee.dob.date.substr(0, 10)}</p>
            </div>
            </div>`;
            //append to DOM
            body.appendChild(modal);

        }
        //instantiate modal
        createModal(employeeImage, employeeName, index);
       
    });
  }

logEmployees();

const employeeCards = document.querySelectorAll('.employee-card');
const container = document.querySelector('.group-container');

//open modal when clicking on employee card
const openModal = (e) => { 
  //display the modal when the card is clicked
  const overlay = document.querySelector('.overlay');
  //get the index of the employee card
  const index = e.target.closest('.employee-card').getAttribute('data-index');
  //get the modal with the same index
  //open the modal with the same index
  const modal = document.querySelectorAll('.modal')[index];
  //display modal
  modal.style.display = 'block';
  //add the open class
  modal.classList.add('modal-open');
  //show overlay
  overlay.classList.remove('hidden');


  //get the close icon from the currently opened modal
const closeIcon = document.querySelector('.modal-open .modal-close');

if (closeIcon !== null) {
  //on click close the current modal
  closeIcon.addEventListener('click', closeModal);
}
}

//add event listener to the container
container.addEventListener('click', openModal);

//close the modal when clicking on close icon
const closeModal = () => {
   //get the currently opened modal
  const overlay = document.querySelector('.overlay');
  //remove the overlay
  overlay.classList.add('hidden');
  const openModal = document.querySelector('.modal-open');
  //hide the modal
  openModal.style.display = 'none';
  //remove the open class
  openModal.classList.remove('modal-open');

};

const input = document.querySelector('#search');

const searchEmployee = () => {

  const searchValue = input.value.toLowerCase();
  const employeeNames = document.querySelectorAll('.employee-name');
  
    employeeNames.forEach((name) => {
        const employeeCard = name.closest('.employee-card');
        const employeeCardName = name.textContent.toLowerCase();
        if (employeeCardName.includes(searchValue)) {
        employeeCard.style.display = 'flex';
        } else {
        employeeCard.style.display = 'none';
        }
    });
}

input.addEventListener('keyup', searchEmployee);
















