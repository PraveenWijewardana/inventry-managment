let body = "";

let productsCount = 0;
let lowStockCount = 0;
let outOfStockCount = 0;

let array = JSON.parse(localStorage.getItem("products")) || [];

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
                                </div>
                            </div>
                        </div>
                    </div>`

        productsCount++;
        if (element.stock < 10) {
            lowStockCount++;
        }
        if (element.stock === 0) {
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
                                </div>
                            </div>
                        </div>
                    </div>`;

    loadBody();
    productsCount++;
    if (product.stock < 10) {
        lowStockCount++;
    }
    if (product.stock === 0) {
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