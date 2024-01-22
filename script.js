

//make fetch request



async function logEmployees() {
    const response = await fetch("https://randomuser.me/api/");
    const employeesData = await response.json();
    console.log(employeesData.results[0]);
  }

logEmployees();