let body = "";

let productsCount = 0;
let lowStockCount = 0;
let outOfStockCount = 0;

var array = JSON.parse(localStorage.getItem("products")) || [];

fetchProducts();


if (array.length > 0) {
    array.forEach(element => {
         body += `<div class="product-card">
                        <img src="${element.url}" alt="${element.name}" class="product-image">
                        <div class="product-body">
                            <div class="product-meta">
                                <span class="category-badge">${element.category}</span>
                            </div>
                            <h3>${element.name}</h3>
                            <p class="muted">ID: ${element.id}</p>
                            <div class="product-footer">
                                <div>
                                    <span class="price">$${element.price}</span>
                                    <span class="stock">${element.stock} units</span>
                                </div>
                                <div class="action-chips">
                                <button class="btn btn-sm btn-danger" onclick="removeProduct(${element.id});">Delete</button>
                                <button class="btn btn-sm btn-primary" onclick="editProduct(${element.id});">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>`

        productsCount++;
        if (element.stock < 10) {
            lowStockCount++;
        }
        if (element.stock == 0) {
            outOfStockCount++;
        }
        
        
        loadBody();;
    });
}


async function fetchProducts() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    data.products.forEach(element => {
        body += ` <div class="product-card">
                        <img src="${element.thumbnail}" alt="${element.title}" class="product-image">
                        <div class="product-body">
                            <div class="product-meta">
                                <span class="category-badge">${element.category}</span>
                            </div>
                            <h3>${element.title}</h3>
                            <p class="muted">ID: ${element.id}</p>
                            <div class="product-footer">
                                <div>
                                    <span class="price">$${element.price}</span>
                                    <span class="stock">${element.stock} units</span>
                                </div>
                                <div class="action-chips">
                                </div>
                            </div>
                        </div>
                    </div>`;
        productsCount++;
        if (element.stock < 10) {
            lowStockCount++;
        }
        if (element.stock === 0) {
            outOfStockCount++;
        }
    });
    document.getElementById("load-products").innerHTML = body;
    loadDashboardStats();
}

function loadBody() {
    document.getElementById("load-products").innerHTML = body;
}

function loadDashboardStats() {
    document.getElementById("productsCount").textContent = productsCount;
    document.getElementById("lowStockCount").textContent = lowStockCount;
    document.getElementById("outOfStockCount").textContent = outOfStockCount;
}

function addProduct() {
    const product = {
        id: document.getElementById("id").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        url: document.getElementById("imageUrl").value,
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        name: document.getElementById("name").value
    };

    array.push(product);

    body += `<div class="product-card">
                        <img src="${product.url}" alt="${product.name}" class="product-image">
                        <div class="product-body">
                            <div class="product-meta">
                                <span class="category-badge">${product.category}</span>
                            </div>
                            <h3>${product.name}</h3>
                            <p class="muted">ID: ${product.id}</p>
                            <div class="product-footer">
                                <div>
                                    <span class="price">$${product.price}</span>
                                    <span class="stock">${product.stock} units</span>
                                </div>
                                <div class="action-chips">
                                <button class="btn btn-sm btn-danger" onclick="removeProduct(${product.id});">Delete</button>
                                <button class="btn btn-sm btn-primary" onclick="editProduct(${product.id});">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>`;

    loadBody();
    productsCount++;
    if (product.stock < 10) {
        lowStockCount++;
    }
    if (product.stock == 0) {
        outOfStockCount++;
    }
    loadDashboardStats();
    localStorage.setItem("products", JSON.stringify(array));
    clearForm();

        Swal.fire({
        title: "Added successfully!",
        icon: "success",
        draggable: true
        });
}


function clearForm(){
    document.getElementById("id").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("imageUrl").value = "";
    document.getElementById("name").value = "";
    document.getElementById("category").value = "All Categories";
}



function removeProduct(id) {
    console.log("Delete clicked for ID:", id);
    array = array.filter(product =>
         product.id != id
    );
    
    localStorage.setItem("products", JSON.stringify(array));

        Swal.fire({
        title: "Deleted successfully!",
        icon: "success",
        draggable: true
        });
    location.reload();
}


let inventoryChart = null; // Variable to store the chart instance

function updateChart() {
    const ctx = document.getElementById('inventoryChart').getContext('2d');

    // Data for the chart
    const data = {
        labels: ['Total Products', 'Low Stock', 'Out of Stock'],
        datasets: [{
            label: 'Inventory Status',
            data: [productsCount, lowStockCount, outOfStockCount],
            backgroundColor: [
                'rgba(54, 162, 235, 0.6)', // Blue
                'rgba(255, 206, 86, 0.6)', // Yellow
                'rgba(255, 99, 132, 0.6)'  // Red
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    };

    if (inventoryChart) {
        // If chart exists, just update data and redraw
        inventoryChart.data = data;
        inventoryChart.update();
    } else {
        // Create the chart for the first time
        inventoryChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: { beginAtZero: true }
                },
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
}

function loadDashboardStats() {
    document.getElementById("productsCount").textContent = productsCount;
    document.getElementById("lowStockCount").textContent = lowStockCount;
    document.getElementById("outOfStockCount").textContent = outOfStockCount;
    
    // Call the chart update here
    updateChart();
}

function editProduct(id) {

    const product = array.find(prod => prod.id == id);


    document.getElementById("formArea").scrollIntoView();

    document.getElementById("id").value = product.id;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;
    document.getElementById("imageUrl").url = product.url;
    document.getElementById("name").value = product.name;
    document.getElementById("category").value = product.category;
}


function updateProduct() {
    const product = array.find(prod => prod.id == document.getElementById("id").value);

    if (!product) {
        Swal.fire({
            title: "Product not found!",
            icon: "error",
            draggable: true
        });
    }else{

        product.id = document.getElementById("id").value;
        product.price = document.getElementById("price").value;
        product.stock = document.getElementById("stock").value;
        product.name = document.getElementById("name").value;
        product.category = document.getElementById("category").value;
        product.url = document.getElementById("imageUrl").value;

        localStorage.setItem("products", JSON.stringify(array));

        Swal.fire({
            title: "Updated successfully!",
            icon: "success",
            draggable: true
        });
        location.reload();
    }
}

async function search() {
    let category = document.getElementById("searchCategory").value;
    body = "";

    if (category == "All Categories") {
        fetchProducts();
        console.log("IF");
        
    } else {;
        console.log(array);
        
        array.forEach(element => {
            console.log(element.category.toLowerCase(), category.toLowerCase());
            if (element.category.toLowerCase() == category.toLowerCase()) {
                 body += `<div class="product-card">
                        <img src="${product.url}" alt="${product.name}" class="product-image">
                        <div class="product-body">
                            <div class="product-meta">
                                <span class="category-badge">${product.category}</span>
                            </div>
                            <h3>${product.name}</h3>
                            <p class="muted">ID: ${product.id}</p>
                            <div class="product-footer">
                                <div>
                                    <span class="price">$${product.price}</span>
                                    <span class="stock">${product.stock} units</span>
                                </div>
                                <div class="action-chips">
                                <button class="btn btn-sm btn-danger" onclick="removeProduct(${product.id});">Delete</button>
                                <button class="btn btn-sm btn-primary" onclick="editProduct(${product.id});">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
            }
        });



    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    data.products.forEach(element => {

        if (element.category.toLowerCase() == category.toLowerCase()) {
        body += ` <div class="product-card">
                        <img src="${element.thumbnail}" alt="${element.title}" class="product-image">
                        <div class="product-body">
                            <div class="product-meta">
                                <span class="category-badge">${element.category}</span>
                            </div>
                            <h3>${element.title}</h3>
                            <p class="muted">ID: ${element.id}</p>
                            <div class="product-footer">
                                <div>
                                    <span class="price">$${element.price}</span>
                                    <span class="stock">${element.stock} units</span>
                                </div>
                                <div class="action-chips">
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
    });
        
        loadBody();
    }


    productsCount = 0;
    lowStockCount = 0;
    outOfStockCount = 0;
}

loadDashboardStats();