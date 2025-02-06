const thumbnailsContainer = document.getElementById("thumbnailsContainer");
const columnContent = document.getElementById("columnContent");
const largerImageContainer = document.getElementById("largerImageContainer");

function getProductIdFromURL() {
    const param = new URLSearchParams(window.location.search);
    return param.get("id");
}

const id = getProductIdFromURL();

fetch(`https://dummyjson.com/products/${id}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.log("Could not obtain data");
        }
    })
    .then(product => {
        columnContent.innerHTML = `
            <div class="content-info-details">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <div class="content-prize">
                    <span>$${product.price}</span>
                    <span>${product.discountPercentage}% Off</span>
                </div>
                <div class="rating">
                    <span>⭐ ${product.rating}</span>
                    <span>Stock: ${product.stock}</span>
                </div>
                <div>
                    <a href="#" class="more">Add to cart</a>
                </div>
            </div>
        `;

        // Set the first image as the large image
        largerImageContainer.innerHTML = `
        <div class="row">
            <div id="largerImageContainer" class="largerImage-Container">
                <img src="${product.images[0]}" class="larger-image" id="largerImage">
            </div>
        </div>`;

        // Populate the thumbnails
        thumbnailsContainer.innerHTML = "";
        product.images.forEach(image => {
            const thumbnail = document.createElement("img");
            thumbnail.src = image;
            thumbnail.classList.add("thumbnail");
            thumbnail.style.cursor = "pointer"; 
            thumbnail.addEventListener("click", () => {
                document.getElementById("largerImage").src = image;
            });

            thumbnailsContainer.appendChild(thumbnail);
        });
        loader.classList.add("hide");
    });
