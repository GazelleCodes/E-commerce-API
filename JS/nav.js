
const navBtn = document.getElementById("navBtn");
const hamburgerBtn = document.getElementById("hamburgerBtn");
navBtn.innerHTML = ``;
navBtn.innerHTML +=`
<a href="index.html" class="btn">Home</a>
<a href="#" class="btn">About</a>
<div class="dropdown">
    <a href="#" class="btn dropdown-btn">Categories ▼</a>
    <ul class="dropdown-menu" id="categoryList"></ul>
</div>
<a href="#" class="btn">Login</a>
<a href="#" class="btn">Register</a>
`

const categoryList = document.getElementById("categoryList");

fetch("https://dummyjson.com/products/categories").then(response=>{
    if(response.ok){
        return response.json();
    }else{
        console.log("Could not obtain data");
    }
}).then(categories=>{
    categories.forEach(category=>{
    categoryList.innerHTML+=`
        <li><a href="category.html?category=${category.name}">${category.name}</a></li>
        `
    })
    .catch(error => console.log("Error fetching categories:", error));
});

// Toggle navigation menu on small screens
hamburgerBtn.addEventListener("click", () => {
    navBtn.classList.toggle("active");
});