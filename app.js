// DOM references
const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");
const minCol = document.getElementById("minColumn");
const maxCol = document.getElementById("maxColumn");
const minRow = document.getElementById("minRow");
const maxRow = document.getElementById("maxRow");
const form = document.querySelector("form");
const errorMsg = document.getElementById("errorMsg");

function renderTable(minCol, minRow, maxCol, maxRow) {
    // clear the table 
    tbody.innerHTML = "";
    thead.innerHTML = "";
    
    const th = document.createElement("th");
    th.innerText = '';
    thead.appendChild(th);
    // Header row: column labels
    for (let i = minCol; i <= maxCol; i++) {
        const th = document.createElement("th");
        th.textContent = String(i);
        thead.appendChild(th);
    }

    // Body rows: one per row value
    for (let i = minRow; i <= maxRow; i++) {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.innerText = String(i); // row header
        tr.appendChild(th);

        for (let j = minCol; j <= maxCol; j++) {
            const td = document.createElement("td");
            td.textContent = String(j * i);
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }
}

function errorCheck() {
    const error = "Error: "

    const minRowVal = Number(minRow.value);
    const minColVal = Number(minCol.value);
    const maxColVal = Number(maxCol.value);
    const maxRowVal = Number(maxRow.value);

    if (isNaN(minColVal) || !minColVal || isNaN(maxColVal) ||
    !maxColVal || isNaN(minRowVal) || !minRowVal || !maxRowVal || isNaN(maxRowVal)) {
        errorMsg.classList.remove("d-none");
        errorMsg.textContent = error + "One of the feilds were left empty. Ensure all feilds have a valid value between -50 and 50";
        return true;
    } else if (minColVal < -50 || minRow < -50) {
        errorMsg.classList.remove("d-none");
        errorMsg.textContent = error + "One of the minimum feilds has a number less than -50. Ensure all feilds have a valid value between -50 and 50";
        return true;
    } else if (maxColVal > 50 || maxRowVal > 50) {
        errorMsg.classList.remove("d-none");
        errorMsg.textContent = error + "One of the maximum feilds has a number less than -50. Ensure all feilds have a valid value between -50 and 50";
        return true;
    } else if (maxColVal < minColVal || maxRowVal < minRowVal) {
        errorMsg.classList.remove("d-none");
        errorMsg.textContent = error + "One of of minumum values have a greater value than its max. Ensure all feilds have a valid value between -50 and 50 that isn't greater than its max";
        return true;
    }
    else {
        errorMsg.classList.add("d-none");
        errorMsg.textContent = "";
    }
    return false;
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const err = errorCheck();
    if (!err) {
        // Convert values to numbers before rendering
        const a = Number(minCol.value);
        const b = Number(maxCol.value);
        const c = Number(minRow.value);
        const d = Number(maxRow.value);
        renderTable(a, c, b, d);
    }
})