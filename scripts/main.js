import { Employees } from "./Employees.js";
import { Customers } from "./Customers.js";

const employeesHTML = await Employees();
const customersHTML = await Customers();

const pageHtml = `   
<section class="employee__list">
${employeesHTML}
</section>
<section class="customer__list">
${customersHTML}
</section>
`;

const mainEl = document.querySelector("#main-content");
mainEl.innerHTML = pageHtml;
