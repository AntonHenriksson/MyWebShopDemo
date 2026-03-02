
async function fetchData(selectedCategory = "all") {
    let finalUrl = "";
    switch (selectedCategory) {
        case "men's clothing":
            finalUrl = "https://fakestoreapi.com/products/category/men's%20clothing";
            break;
        case "jewelery":
            finalUrl = "https://fakestoreapi.com/products/category/jewelery";
            break;
        case "electronics":
            finalUrl = "https://fakestoreapi.com/products/category/electronics";
            break;
        case "women's clothing":
            finalUrl = "https://fakestoreapi.com/products/category/women's%20clothing";
            break;
        default:
            finalUrl = "https://fakestoreapi.com/products/";

    }
    try {
        const response = await fetch(finalUrl);
        if (!response.ok) {
            throw new Error(`Could not fetch API: ${finalUrl}`);
        };
        const data = await response.json();
        const categoriesSet = new Set();

        const container = document.getElementById("product");
        container.innerHTML = "";

        container.classList.add("row", "g-4", "p-4", "text-center");



        data.forEach(i => {
            const col = document.createElement("div");
            col.classList.add("col-md-4", "col-lg-3");
            const card = document.createElement("div");
            card.classList.add("card", "h-100", "shadow-sm");


            //image

            const img = document.createElement("img");
            img.src = i.image;
            img.classList.add("card-img-top", "p-3");
            img.style.height = "200px";
            img.style.objectFit = "contain";

            //body
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body", "d-flex", "flex-column");

            //title 
            const title = document.createElement("article");
            title.classList.add("card-title");
            title.innerText = i.title;

            //description
            const desc = document.createElement("div");
            desc.classList.add("card-text", "small", "text-muted", "mb-auto");
            desc.innerText = i.description.substring(0, 100) + "...";

            //price
            const price = document.createElement("p");
            price.classList.add("card-text", "fw-bold", "text-primary");
            price.innerText = i.price + " $";

            //category
            const category = document.createElement("button")
            category.classList.add("text-muted");
            category.innerText = i.category;
            categoriesSet.add(i.category);


            cardBody.appendChild(title);
            cardBody.appendChild(desc);
            cardBody.appendChild(price);

            cardBody.appendChild(img);
            card.appendChild(cardBody);

            col.appendChild(card);
            container.appendChild(col);
        });


    } catch (error) {
        console.error(error);
    };
};
function createNavLink(name, parent) {
    const navItem = document.createElement("li");
    navItem.classList.add("nav-item");

    const navLink = document.createElement("a");
    navLink.classList.add("nav-link", "text-capitalize");
    navLink.href = "#";
    navLink.innerText = name;

    navLink.addEventListener("click", (e) => {
        e.preventDefault();
        fetchData(name);
    })

    navItem.appendChild(navLink);
    parent.appendChild(navItem);
};

async function setupNav() {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await response.json();
    const navBar = document.getElementById("nav-bar");
    navBar.innerHTML = "";
    navBar.classList.add("nav", "justify-content-center");

    createNavLink("all", navBar);
    categories.forEach(cat => createNavLink(cat, navBar));
}

setupNav();
fetchData();