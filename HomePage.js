let selectedEdition = null;
let selectedPrice = 0;


/* Select an edition */

function selectEdition(name, price) {

    selectedEdition = name;
    selectedPrice = price;


    let editions = document.querySelectorAll(".edition");


    editions.forEach(edition => {

        edition.classList.remove("selected");

    });


    event.currentTarget.classList.add("selected");


    let selectedBox = document.getElementById("selectedEdition");


    selectedBox.innerHTML = `
        <p>
            Selected: ${name} - €${price.toFixed(2)}
        </p>
    `;


    document.getElementById("addGameButton").disabled = false;

}


/* Add selected game to cart */

function addSelectedEdition() {

    if (selectedEdition === null) {

        return;

    }


    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    let existingProduct = cart.find(
        product => product.name === selectedEdition
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: selectedEdition,

            price: selectedPrice,

            quantity: 1

        });

    }


    localStorage.setItem("cart", JSON.stringify(cart));


    alert(
        selectedEdition +
        " has been added to your cart!"
    );

}