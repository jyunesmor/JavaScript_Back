import { addToCart, subtractToCart } from "./cartService.js";

let main_checkout = document.getElementById("main_checkout");
let counterProductsCart = document.getElementById("counterProductsCart");

function crearTarjetasProductosCarrito() {
	main_checkout.innerHTML = "";
	const productos = JSON.parse(localStorage.getItem("productsCart"));
	if (productos && productos.length > 0) {
		productos.forEach((producto) => {
			const newProduct = document.createElement("div");
			newProduct.classList = "product";
			newProduct.innerHTML = `
          <img src=${producto.imagen} alt=${producto.nombre}>
          <h3>${producto.nombre}</h3>
          <span>$${producto.precio}</span>
          <div class="quantityCounter">
            <button class="fa-solid fa-minus"></button>
            <span class="quantityElement">${producto.quantity}</span>
            <button class="fa-solid fa-plus"></button>
          </div>
    `;
			main_checkout.appendChild(newProduct);
			newProduct
				.getElementsByTagName("button")[0]
				.addEventListener("click", (e) => {
					const quantityElement =
						e.target.parentElement.getElementsByClassName("quantityElement")[0];
					quantityElement.innerText = subtractToCart(producto);
					crearTarjetasProductosCarrito();
					TotalCartItems();
					TotalCart();
				});
			newProduct
				.getElementsByTagName("button")[1]
				.addEventListener("click", (e) => {
					const quantityElement =
						e.target.parentElement.getElementsByClassName("quantityElement")[0];
					quantityElement.innerText = addToCart(producto);
					TotalCartItems();
					TotalCart();
				});
		});
	}
	TotalCart();
}

function TotalCart() {
	const cartStorage = JSON.parse(localStorage.getItem("productsCart"));
	let totalPrice = 0;
	totalPriceContent.innerHTML = "";
	const totalPriceCart = document.createElement("div");
	if (cartStorage && cartStorage.length > 0) {
		cartStorage.forEach((p) => {
			totalPrice += p.precio * p.quantity;
		});
	}
	totalPriceCart.innerHTML = `
    <p><span>Total del Carrito</span> $ ${totalPrice.toFixed(2)}</p>
  `;
	totalPriceContent.appendChild(totalPriceCart);
}

function TotalCartItems() {
	const cartStorage = JSON.parse(localStorage.getItem("productsCart"));
	let totalItems = 0;
	if (cartStorage && cartStorage.length > 0) {
		cartStorage.forEach((p) => {
			totalItems += p.quantity;
		});
	}

	counterProductsCart.innerText = totalItems;
}

crearTarjetasProductosCarrito();
