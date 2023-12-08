export const Customers = async () => {
  const arraysToGet = ["customers", "workOrders", "employees"];
  const moduleData = {};
  for (const array of arraysToGet) {
    const response = await fetch(`http://localhost:8088/${array}`);
    moduleData[`${array}`] = await response.json();
  }

  const customersHtmlStrings = moduleData.customers.map((customer) => {
    const workOrderMatches = moduleData.workOrders.filter(
      (workOrder) => parseInt(workOrder.customerId) === parseInt(customer.id)
    );

    console.log(workOrderMatches);

    let html = `
        <div class="customer">
        <header class="customer__name">
        <h1>${customer.name}</h1>
        </header>
        <section class="customer__employees">
        Has worked with the following employees:
        <ul>
    `;

    for (const workOrder of workOrderMatches) {
      const employeeMatch = moduleData.employees.find(
        (employee) => parseInt(employee.id) === parseInt(workOrder.employeeId)
      );
      html += `<li>${employeeMatch.firstName} ${employeeMatch.lastName}</li>`;
    }

    html += "</ul></section></div>";

    return html;
  });

  return customersHtmlStrings.join("");
};
