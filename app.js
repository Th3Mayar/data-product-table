import sweetalert2 from "https://cdn.jsdelivr.net/npm/sweetalert2@11.11.0/+esm";

// Initialize and add the map (Script for actions program)
const dataInsert = document.querySelector("#output-data");
const form = document.querySelector(".content-button");
const modalClose = document.querySelector(".modal-close");
const btnDelete = document.querySelector(".btn-danger");
const apiProduct = "https://dummyjson.com/"; // API assigment for fetch data

let count = 0;

// Event listener for insert data
form.addEventListener("click", async (e) => {
  e.preventDefault();
  count++;
  // Fetch data from API
  const response = await fetch(apiProduct);

  // Validate if data already exists
  if (count > 1) {
    sweetalert2.fire({
      title: "Data already exists!",
      icon: "warning",
      confirmButtonText: "Close",
    });
    return;
  }

  try {
    // console.log(!response);
    if (apiProduct != "https://dummyjson.com/products") {
      dataInsert.innerHTML =
        "<tr class='row-error'><td colspan='8' class='elementNotFound'>No data found</td></tr>";
      sweetalert2.fire({
        title: "Data not found!",
        icon: "warning",
        confirmButtonText: "Close",
      });
      return;
    } else {
      const data = await response.json(); // Convert data to JSON
      const products = data.products; // Get products from data

      // This lines code is for insert data in table HTML, not used innerHTML, used createElement and appendChild
      products.map((product, index) => {
        const newRow = document.createElement("tr");
        newRow.className = `row-${index} row-data`;

        const idCell = document.createElement("td");

        idCell.textContent = product.id;
        newRow.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = product.title;
        newRow.appendChild(nameCell);

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = product.description;
        descriptionCell.className = "description";
        newRow.appendChild(descriptionCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = product.price;
        newRow.appendChild(priceCell);

        const stockCell = document.createElement("td");
        stockCell.textContent = product.stock;
        newRow.appendChild(stockCell);

        const categoryCell = document.createElement("td");
        categoryCell.textContent = product.category;
        newRow.appendChild(categoryCell);

        const imageCell = document.createElement("td");
        const imgTag = document.createElement("img");
        imgTag.src = product.images[0];

        imgTag.width = 100; // Add property width to image

        imageCell.appendChild(imgTag);
        newRow.appendChild(imageCell);

        const actionCell = document.createElement("td");
        actionCell.className = "actions-data";
        const actionDeleteButton = document.createElement("button");
        actionDeleteButton.textContent = "Delete";
        actionDeleteButton.className = "btn btn-danger";

        const actionEditButton = document.createElement("button");
        actionEditButton.textContent = "Edit";
        actionEditButton.className = "btn btn-warning";

        actionCell.appendChild(actionDeleteButton);
        // actionCell.appendChild(actionEditButton);
        newRow.appendChild(actionCell);
        dataInsert.appendChild(newRow);

        const rowData = document.querySelectorAll(`.row-${index}`); // Add class to row c/u row
        const row = rowData[0];
        const rowClass = row.classList[0];
        const rowElement = document.querySelector(`.${rowClass}`);

        // Event listener for select cell row
        rowElement.addEventListener("click", () => {
          const modal = document.querySelector("#exampleModalCenter"); // Get modal
          const modalTitle = document.querySelector(".modal-title"); // Get modal title
          const modalBody = document.querySelector(".modal-body"); // Get modal body
          const row = document.querySelector(`.${rowClass}`); // Get row element

          // Add class active for modal view
          modal.classList.add("active");

          // Dinamic content modal
          const dynamicContent = `<img src="${product.images[0]}">`;
          modalBody.innerHTML = dynamicContent;

          modalTitle.textContent = `Delete Product: ${product.title}`; // Title modal insert

          if (modal.classList.contains("active")) {
            rowElement.dataset.toggle = "modal";
            rowElement.dataset.target = "#exampleModalCenter";

            btnDelete.addEventListener("click", () => {
              rowElement.remove();
              modal.classList.remove("active");
              modalClose.click();

              sweetalert2.fire({
                title: "Deleted!",
                icon: "success",
                confirmButtonText: "Close",
              });
            });
          }
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
});
