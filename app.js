/*
  Author: Theodor Farag
  Username: theodorfarag
  Contact: theodor_farag@student.uml.edu
  Date: 2025-10-11
*/
// DOM references: cache frequently-used elements for rendering and validation
const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");
const minCol = document.getElementById("minColumn");
const maxCol = document.getElementById("maxColumn");
const minRow = document.getElementById("minRow");
const maxRow = document.getElementById("maxRow");
const form = document.querySelector("form");
const errorMsg = document.getElementById("errorMsg");

// Renders the multiplication table into the DOM.
// Parameters are numbers (min/max for columns and rows).
function renderTable(minCol, minRow, maxCol, maxRow) {
  // Clear any existing table content before building a fresh one
  tbody.innerHTML = "";
  thead.innerHTML = "";

  // Top-left empty corner cell (intersection of header row and header column)
  const th = document.createElement("th");
  th.innerText = "";
  thead.appendChild(th);

  // Header row: create a <th> for each column label
  for (let i = minCol; i <= maxCol; i++) {
    const th = document.createElement("th");
    th.textContent = String(i);
    thead.appendChild(th);
  }

  // Body rows: for each row value, create a row and populate cells
  for (let i = minRow; i <= maxRow; i++) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    // Row header (first cell of the row)
    th.innerText = String(i);
    tr.appendChild(th);

    // Fill the row with product cells
    for (let j = minCol; j <= maxCol; j++) {
      const td = document.createElement("td");
      td.textContent = String(j * i);
      tr.appendChild(td);
    }

    // Append the completed row to the table body
    tbody.appendChild(tr);
  }
}

// Validate form inputs and show an inline error message if invalid.
// Returns true when there is an error (so the caller can abort rendering).
function errorCheck() {
  const error = "Error: ";

  // Convert input values to numbers for robust comparisons
  const minRowVal = Number(minRow.value);
  const minColVal = Number(minCol.value);
  const maxColVal = Number(maxCol.value);
  const maxRowVal = Number(maxRow.value);

  // Check for empty or non-numeric inputs
  if (
    isNaN(minColVal) ||
    !minColVal ||
    isNaN(maxColVal) ||
    !maxColVal ||
    isNaN(minRowVal) ||
    !minRowVal ||
    !maxRowVal ||
    isNaN(maxRowVal)
  ) {
    errorMsg.classList.remove("d-none");
    errorMsg.textContent =
      error +
      "One of the feilds were left empty. Ensure all feilds have a valid value between -50 and 50";
    return true;
  } else if (minColVal < -50 || minRow < -50) {
    // Ensure minimums are not less than allowed lower bound
    errorMsg.classList.remove("d-none");
    errorMsg.textContent =
      error +
      "One of the minimum feilds has a number less than -50. Ensure all feilds have a valid value between -50 and 50";
    return true;
  } else if (maxColVal > 50 || maxRowVal > 50) {
    // Ensure maximums are not greater than allowed upper bound
    errorMsg.classList.remove("d-none");
    errorMsg.textContent =
      error +
      "One of the maximum feilds has a number less than -50. Ensure all feilds have a valid value between -50 and 50";
    return true;
  } else if (maxColVal < minColVal || maxRowVal < minRowVal) {
    // Logical consistency: each max should be >= its min
    errorMsg.classList.remove("d-none");
    errorMsg.textContent =
      error +
      "One of of minumum values have a greater value than its max. Ensure all feilds have a valid value between -50 and 50 that isn't greater than its max";
    return true;
  } else {
    // No errors found: hide the error message
    errorMsg.classList.add("d-none");
    errorMsg.textContent = "";
  }
  return false;
}

// Wire up the form submit handler. Prevent default form submission and
// render the table when inputs are valid.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const err = errorCheck();
  if (!err) {
    // Convert values to numbers before rendering
    const a = Number(minCol.value);
    const b = Number(maxCol.value);
    const c = Number(minRow.value);
    const d = Number(maxRow.value);
    renderTable(a, c, b, d);
  }
});
