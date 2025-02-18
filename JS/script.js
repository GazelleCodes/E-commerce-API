const productContainer = document.getElementById("productContainer");
productContainer.innerHTML = "";

fetch("https://dummyjson.com/products").then(response=>{
    if(response.ok){
        return response.json();
    }else{
        console.log("Could not obtain data");
    }
}).then(data=>{
    console.log(data["products"])
    const limitedProducts = data["products"].slice(0, 8);
    limitedProducts.forEach(product=>{
        const newTitle = product.title.substr(0,20);
        productContainer.innerHTML+=`
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="column-content">
                        <a href="#" class="image-container"> 
                            <img src="${product.images[0]}" width='100' height='100'>
                        </a>
                        <div class="content-info">
                            <h2>${newTitle}</h2>
                            <div class="content-prize">
                                <span>$${product.price}</span>
                                <span>${product.discountPercentage}%Off</span>
                            </div>
                            <div class="rating">
                                <span> ⭐${product.rating}</span>
                                <span>Stock: ${product.stock}</span>
                            </div>
                            <a href="detail.html?id=${product.id}" class="more">Read More</a>
                        </div>
                    </div>
                </div>
            
        `
    })
    loader.classList.add("hide");
})


const header = document.getElementById("header");

// Array of background images
const images = [
    "../images/banner1.webp",
    "../images/banner2.webp",
    "../images/banner3.webp"
];

// Function to change background image randomly
function changeBackground() {
    const randomImage = Math.floor(Math.random() * images.length);
    header.style.backgroundImage = `url('${images[randomImage]}')`;
}

// Change background every 3 seconds
setInterval(changeBackground, 3000);



