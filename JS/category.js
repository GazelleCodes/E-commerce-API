const productContainer = document.getElementById("productContainer");
productContainer.innerHTML = "";

function getProductCategoryFromURL() {
    const param = new URLSearchParams(window.location.search);
    return param.get("category");
}

const category = getProductCategoryFromURL();

fetch(`https://dummyjson.com/products/category/${category}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not obtain data");
        }
        return response.json();
    })
    .then(data => {
        data["products"].forEach(product => {
            const newTitle = product.title.substr(0,20);
            const firstImage = product.images.length > 0 ? product.images[0] : "default.jpg";
            // console.log("Product Image:", firstImage);

            productContainer.innerHTML += `
                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="column-content">
                        <a href="detail.html?id=${product.id}" class="image-container"> 
                            <img src="${firstImage}" width="150" height="150" alt="${product.title}">
                        </a>
                        <div class="content-info">
                            <h2>${newTitle}</h2>
                            <div class="content-prize">
                                <span>$${product.price}</span>
                                <span>${product.discountPercentage}% Off</span>
                            </div>
                            <div class="rating">
                                <span>⭐ ${product.rating}</span>
                                <span>Stock: ${product.stock}</span>
                            </div>
                            <a href="detail.html?id=${product.id}" class="more">Read More</a>
                        </div>
                    </div>
                </div>
            `;
        });
        loader.classList.add("hide");
    })
    .catch(error => console.error("Error fetching products:", error));
