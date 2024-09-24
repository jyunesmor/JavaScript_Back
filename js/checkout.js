import { addToCart, subtractToCart } from "./cartService.js";

let main_checkout = document.getElementById("main_checkout");
let totalPriceContent = document.getElementById("totalPrice");
let buttonCart = document.getElementById("buttonCart");

function crearTarjetasProductosCarrito() {
	main_checkout.innerHTML = "";
	const productos = JSON.parse(localStorage.getItem("productsCart"));
	let totalPrice;
	console.log(productos);
	if (productos && productos.length > 0) {
		productos.forEach((producto) => {
			totalPrice = producto.precio * producto.quantity;
			const newProduct = document.createElement("div");
			newProduct.classList = "product";
			newProduct.innerHTML = `
          <img src=${producto.imagen} alt=${producto.nombre}>
          <div>
					  <h3>${producto.nombre} ${producto.marca}</h3>
		      	<p>${producto.tipo} ${producto.capacidad}</p>
					</div>
          <span>$ ${producto.precio}</span>
          <div class="quantityCounter">
            <button class="fa-solid fa-minus"></button>
            <span class="quantityElement">${producto.quantity}</span>
            <button class="fa-solid fa-plus"></button>
          </div>
					<span class="totalPriceProd">$ ${totalPrice}</span>
					<div><i class="fa-solid fa-trash"></i></div>
    `;
			buttonCart.style.display = "block";
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
					crearTarjetasProductosCarrito();
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
	} else {
		const textEmptyCart = document.createElement("h4");
		textEmptyCart.classList.add("TextCartEmpty");
		textEmptyCart.textContent = "Tu carrito está vacío";
		totalPriceContent.style.display = "none";
		main_checkout.appendChild(textEmptyCart);
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
	return totalPrice;
}

const removeCart = document.getElementById("removeCart");
removeCart.addEventListener("click", (e) => {
	e.preventDefault();
	let cartStorage = JSON.parse(localStorage.getItem("productsCart"));
	console.log(cartStorage);
	if (cartStorage) {
		cartStorage = [];
		localStorage.removeItem("productsCart");
		location.reload();
	}
});

const buyCart = document.getElementById("buyCart");
buyCart.addEventListener("click", (e) => {
	e.preventDefault();
	let pedidos = JSON.parse(localStorage.getItem("pedidos"));
	let cartStorage = JSON.parse(localStorage.getItem("productsCart"));
	if (cartStorage) {
		Swal.fire({
			title: "Quieras Completar la Compra?",
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: "Comprar",
			denyButtonText: `Salir`,
		}).then((result) => {
			/* Read more about isConfirmed */
			if (result.isConfirmed) {
				let pedidoNew = cartStorage;
				const id = idPedido();
				const totalPrice = TotalCart();
				pedidoNew.unshift(totalPrice);
				pedidoNew.unshift(id);
				if (pedidos) {
					pedidos.push(pedidoNew);
					localStorage.setItem("pedidos", JSON.stringify(pedidos));
					Swal.fire(
						`Gracias por su compra 
					Pedido N° ${id}`,
						"",
						"success"
					);
					localStorage.removeItem("productsCart");
					location.reload();
				} else {
					localStorage.setItem("pedidos", JSON.stringify([pedidoNew]));
					Swal.fire(
						`Gracias por su compra 
					Pedido N° ${id}`,
						"",
						"success"
					);
					localStorage.removeItem("productsCart");
					location.reload();
				}
			} else if (result.isDenied) {
				Swal.fire("Gracias por Visitarnos");
			}
		});
	}
});

const idPedido = () => {
	const date = Date.now().toString(30);
	const number = Math.random().toString(20).substring(2);
	return date + number;
};

crearTarjetasProductosCarrito();
