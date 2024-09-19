import { addToCart, subtractToCart } from "./cartService.js";

let main_checkout = document.getElementById("main_checkout");
let totalPriceContent = document.getElementById("totalPrice");

function crearTarjetasProductosCarrito() {
	main_checkout.innerHTML = "";
	const productos = JSON.parse(localStorage.getItem("productsCart"));
	if (productos && productos.length > 0) {
		productos.forEach((producto) => {
			const newProduct = document.createElement("div");
			newProduct.classList = "product";
			newProduct.innerHTML = `
          <img src=${producto.imagen} alt=${producto.nombre}>
          <div>
					  <h3>${producto.nombre} ${producto.marca}</h3>
		      	<p>${producto.tipo} ${producto.capacidad}</p>
					</div>
          <span>$${producto.precio}</span>
          <div class="quantityCounter">
            <button class="fa-solid fa-minus"></button>
            <span class="quantityElement">${producto.quantity}</span>
            <button class="fa-solid fa-plus"></button>
          </div>
					<div><i class="fa-solid fa-trash"></i></div>
    `;
			main_checkout.appendChild(newProduct);
			newProduct
				.getElementsByTagName("button")[0]
				.addEventListener("click", (e) => {
					const quantityElement =
						e.target.parentElement.getElementsByClassName("quantityElement")[0];
					quantityElement.innerText = subtractToCart(producto);
					crearTarjetasProductosCarrito();
					TotalCart();
				});
			newProduct
				.getElementsByTagName("button")[1]
				.addEventListener("click", (e) => {
					const quantityElement =
						e.target.parentElement.getElementsByClassName("quantityElement")[0];
					quantityElement.innerText = addToCart(producto);
					TotalCart();
				});
			newProduct
				.getElementsByClassName("fa-trash")[0]
				.addEventListener("click", (e) => {
					const productoIndex = productos.findIndex(
						(p) => p.id === producto.id
					);
					if (productoIndex !== -1) {
						productos.splice(productoIndex, 1);
						localStorage.setItem("productsCart", JSON.stringify(productos));
						crearTarjetasProductosCarrito();
						TotalCart();
					}
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

crearTarjetasProductosCarrito();
