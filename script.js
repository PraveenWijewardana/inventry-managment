let body ="";
let productsCount = 0;
let lowStockCount = 0;
let outOfStockCount = 0;

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
        data.products.forEach(element => {
            body+=` <article class="product-card">
                        <img src="${element.thumbnail}" alt="${element.title}" class="product-image">
                        <div class="product-body">
                            <div class="product-meta">
                                <span class="category-badge">${element.category}</span>
                                <span class="status-badge low-stock">Low Stock</span>
                            </div>
                            <h3>${element.title}</h3>
                            <p class="muted">SKU: ${element.id}</p>
                            <div class="product-footer">
                                <div>
                                    <span class="price">$${element.price}</span>
                                    <span class="stock">${element.stock} units</span>
                                </div>
                                <div class="action-chips">
                                    <button class="btn btn-sm btn-secondary">Edit</button>
                                    <button class="btn btn-sm btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </article>`;
            productsCount++;
            if(element.stock < 10){
                lowStockCount++;
            }
            if(element.stock === 0){
                outOfStockCount++;
            }
        });
        document.getElementById("load-products").innerHTML=body;
        document.getElementById("productsCount").textContent = productsCount;
        document.getElementById("lowStockCount").textContent = lowStockCount;
        document.getElementById("outOfStockCount").textContent = outOfStockCount;
    })
    .catch(error => console.error('Error fetching products:', error));