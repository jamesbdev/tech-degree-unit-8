
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
            <div class="modal-nav">
                <a href="#" class="modal-prev">Prev</a>
                <a href="#" class="modal-next">Next</a>
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

// Function to add event listener to the close icon of the new modal
const addCloseEventListener = (modal) => {
    const closeIcon = modal.querySelector('.modal-close');
  
    if (closeIcon !== null) {
      // Remove any existing event listeners
      closeIcon.removeEventListener('click', closeModal);
      // Add new event listener
      closeIcon.addEventListener('click', closeModal);
    }
};

// Add event listener to the close icon
addCloseEventListener(modal);


    //show next modal when clicking on "next" button
    const nextEmployee = (event) => {
        //get the data-id attribute of the currently opened modal
        //get all modals 
        const modals = document.querySelectorAll('.modal');
        //get the index of the current modal
        let modalIndex = document.querySelector('.modal-open').getAttribute('data-index');
        //get the index of the next modal
        let nextModalIndex = parseInt(modalIndex, 10) + 1;
        // Check if nextModalIndex is within range
        if (nextModalIndex >= modals.length) {
        nextModalIndex = 0; // Loop back to the first modal
        }
        
        const nextModal = modals[nextModalIndex];

        //get the current modal
        const currentModal = document.querySelector('.modal-open');
        //hide the current modal
        currentModal.style.display = 'none';
        //remove the open class
        currentModal.classList.remove('modal-open');
        //display the next modal
        nextModal.style.display = 'block';
        //add the open class
        nextModal.classList.add('modal-open');
        
        addListeners(nextModal);
    }

    //displays the previous employee modal 
    const previousEmployee = (event) => {
        //get the data-id attribute of the currently opened modal 
        let modalIndex = document.querySelector('.modal-open').getAttribute('data-index');
        //get index of the previous modal
        let prevModalIndex = parseInt(modalIndex, 10) - 1;
      
        // Check if nextModalIndex is within range
        if (prevModalIndex <= 0) {
            prevModalIndex = 11; // Loop back to the first modal
        }
        //get the next modal index
        let nextModalIndex = parseInt(modalIndex, 10) + 1;
        //get the next modal
        const nextModal = document.querySelectorAll('.modal')[nextModalIndex];
          //get the modal with the previous index
        const previousModal = document.querySelectorAll('.modal')[prevModalIndex];
        //hide the current modal
        const currentModal = document.querySelector('.modal-open');
        currentModal.style.display = 'none';
        currentModal.classList.remove('modal-open');
        //display the next modal
        previousModal.style.display = 'block';
        previousModal.classList.add('modal-open');

        //add event listeners
        addListeners(previousModal);
        
    }

    const addListeners = (modal) => {
       //add event listener to close the modal
       addCloseEventListener(modal);
       //add event listener to previous button
       addPrevEventListener(modal);
       //add event listener to next button
       addNextEventListener(modal);
    }
    //get the previous button
    const prevBtn = document.querySelector('.modal-open .modal-prev');
    //get the next button
    const nextBtn = document.querySelector('.modal-open .modal-next');
    //add an event listener to the next button
    if (nextBtn !== null) { 
    nextBtn.addEventListener('click', nextEmployee);
    }
    //add an event listener to the previous button 
    if (prevBtn !== null) {
        prevBtn.addEventListener('click', previousEmployee);
    }


    //function to add event listener to the next button
    const addNextEventListener = (modal) => {
        if (modal !== null && modal !== undefined) {
        const nextBtn = modal.querySelector('.modal-next');
        if (nextBtn !== null) {
            nextBtn.removeEventListener('click', nextEmployee);
            nextBtn.addEventListener('click', nextEmployee);
        }
        } else {
            console.log(modal);
        }
    };

    //function to add event listener to the previous button
    const addPrevEventListener = (modal) => {
        const prevBtn = modal.querySelector('.modal-prev');
        if (prevBtn !== null) {
          prevBtn.removeEventListener('click', previousEmployee);
          prevBtn.addEventListener('click', previousEmployee);
        }
    }
}
//end of openModal function

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

//get the search input
const input = document.querySelector('#search');
//displays employees with the name searched for
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
//add event listener to the input
input.addEventListener('keyup', searchEmployee);



















