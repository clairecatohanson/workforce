export const Employees = async () => {
  const arraysToGet = [
    "employees",
    "computers",
    "departments",
    "locations",
    "workOrders",
    "customers",
  ];

  const database = {};
  for (const item of arraysToGet) {
    const response = await fetch(`http://localhost:8088/${item}`);
    database[item] = await response.json();
  }

  const employeeHtmlStringArray = database.employees.map((employee) => {
    const computerMatchObj = database.computers.find(
      (computer) => parseInt(computer.id) === parseInt(employee.computerId)
    );
    const departmentMatchObj = database.departments.find(
      (department) =>
        parseInt(department.id) === parseInt(employee.departmentId)
    );
    const locationMatchObj = database.locations.find(
      (location) => parseInt(location.id) === parseInt(employee.locationId)
    );
    const workOrderMatchesArray = database.workOrders.filter(
      (workOrder) => parseInt(workOrder.employeeId) === parseInt(employee.id)
    );

    let html = `
            <div class="employee">
                <header class="employee__name">
                    <h1>${employee.firstName} ${employee.lastName}</h1>
                </header>
                <section class="employee__computer">
                    Currently using a ${computerMatchObj.year} ${computerMatchObj.model}
                </section>
                <section class="employee__department">
                    Works in the ${departmentMatchObj.name} department
                </section>
                <section class="employee__location">
                    Works at the ${locationMatchObj.location} office
                </section>
                <section class="employee__customers">
                    Has worked for the following customers:
                    <ul>
        `;

    for (const workOrder of workOrderMatchesArray) {
      const customerMatch = database.customers.find(
        (customer) => parseInt(customer.id) === parseInt(workOrder.customerId)
      );
      html += `<li>${customerMatch.name}</li>`;
    }
    html += "</ul></section></div>";
    return html;
  });

  return employeeHtmlStringArray.join("");
};
