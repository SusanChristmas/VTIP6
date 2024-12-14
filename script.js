document.getElementById("loadTable").addEventListener("click", function () {
  const products = createProductsArray();

  // Populate the table with products
  populateTable(products);

  // Calculate and display statistics
  displayStats(products);
});

function createProductsArray() {
  // Create an array of 30 products
  return Array.from({ length: 30 }, (_, i) => ({
    id: `Article ${i + 1}`,
    quantity: Math.floor(Math.random() * 100) + 1, // Random quantity between 1 and 100
    price: Math.floor(Math.random() * 1000) + 100, // Random price between 100 and 1100
    image: `https://via.placeholder.com/100?text=Product+${i + 1}`, // Placeholder image
  }));
}

function populateTable(products) {
  const tableBody = document.querySelector("#productTable tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  products.forEach((product) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td><img src="${product.image}" alt="${product.id}" /></td>
            <td>${product.id}</td>
            <td>${product.quantity}</td>
            <td>${product.price} $</td>
        `;

    row.addEventListener("click", function () {
      alert(`Price: ${product.price} $`);
    });

    tableBody.appendChild(row);
  });
}

function displayStats(products) {
  const prices = products.map((product) => product.price);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = (
    prices.reduce((sum, price) => sum + price, 0) / prices.length
  ).toFixed(2);

  document.getElementById("minPrice").textContent = `${minPrice} $`;
  document.getElementById("maxPrice").textContent = `${maxPrice} $`;
  document.getElementById("avgPrice").textContent = `${avgPrice} $`;
}
