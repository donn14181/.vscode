let cart = JSON.parse(localStorage.getItem("cart")) || [];


function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}


function addToCart(name, price) {

    let existingProduct = cart.find(
        product => product.name === name
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

}


function updateCart() {

    let totalItems = 0;


    cart.forEach(product => {

        totalItems += product.quantity;

    });


    document.getElementById("cartCount").textContent = totalItems;

    document.getElementById("cartItems").textContent = totalItems;


    let cartProducts =
        document.getElementById("cartProducts");


    cartProducts.innerHTML = "";


    cart.forEach((product, index) => {

        let item = document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <p>

                ${product.name}

                <br>

                €${product.price.toFixed(2)}

                <br>

                Quantity: ${product.quantity}

            </p>

            <button onclick="removeFromCart(${index})">

                Remove

            </button>

        `;


        cartProducts.appendChild(item);

    });

}


function removeFromCart(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

}


function toggleCart() {

    let cartBox =
        document.getElementById("cart");


    if (cartBox.style.display === "block") {

        cartBox.style.display = "none";

    } else {

        cartBox.style.display = "block";

    }

}


function scrollToSection(section) {

    document
        .getElementById(section)
        .scrollIntoView({
            behavior: "smooth"
        });

}


function showAllProducts() {

    let sections =
        document.querySelectorAll(".product-section");


    sections.forEach(section => {

        section.style.display = "block";


        let products =
            section.querySelectorAll(".product");


        products.forEach(product => {

            product.style.display = "block";

        });

    });


    document.getElementById("all-products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


document
    .getElementById("searchBar")
    .addEventListener("keyup", function() {

        let search =
            this.value.toLowerCase();


        let sections =
            document.querySelectorAll(".product-section");


        sections.forEach(section => {

            let products =
                section.querySelectorAll(".product");


            let foundProduct = false;


            products.forEach(product => {

                let name =
                    product
                        .querySelector("h4")
                        .textContent
                        .toLowerCase();


                if (name.includes(search)) {

                    product.style.display = "block";

                    foundProduct = true;

                } else {

                    product.style.display = "none";

                }

            });


            if (foundProduct) {

                section.style.display = "block";

            } else {

                section.style.display = "none";

            }

        });

    });


updateCart();