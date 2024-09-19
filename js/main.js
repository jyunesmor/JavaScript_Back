import { addToCart } from "./cartService.js";

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(ShowLocation);
}

const date = new Date();
const monthText = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];

function convertMonth(monthNumber) {
	return monthText.filter((month, i) => i === monthNumber);
}

async function ShowLocation(position) {
	let response = await fetch(
		`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
	);
	let data = await response.json();
	document.getElementById("place").innerHTML = ` Ciudad de ${
		data.address.city
	}, ${date.getDate()} de ${convertMonth(
		date.getMonth()
	)} del ${date.getFullYear()} `;
}

let dateFooter = document.getElementById("date");
setInterval(function () {
	var data = new Date();
	dateFooter.innerHTML = data.toLocaleTimeString();
}, 1000);

/* API Json y LocalStorage */

const productosJson = await axios.get("../Json/productos.json");
const productos = JSON.parse(localStorage.getItem("productsCart"));

/* Variables */
let products = Object.values(productosJson.data);

/* DOM */
const productsContainer = document.getElementById("images");
const totalItemsCart = document.getElementById("totalItemsCart");

/* Functions */

function crearTarjetasProductosInicio(productos) {
	productsContainer.innerHTML = "";
	productos.forEach((producto) => {
		const newProduct = document.createElement("div");
		newProduct.innerHTML = `
    <img src=${producto.imagen} alt=${producto.nombre}>
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`;
		productsContainer.appendChild(newProduct);
		newProduct
			.getElementsByTagName("button")[0]
			.addEventListener("click", () => {
				addToCart(producto);
				numberItemCart();
			});
	});
	numberItemCart();
}

crearTarjetasProductosInicio(products);

function filterProduct(productsArray, search) {
	return productsArray.filter((p) => p.nombre.toUpperCase().includes(search));
}

function numberItemCart() {
	/* Local Storage data */
	let localDataStorage = JSON.parse(localStorage.getItem("productsCart"));
	const totalItem = Object.values(localDataStorage).reduce(
		(acc, current) => acc + current.quantity,
		0
	);
	totalItemsCart.innerText = totalItem;
}

/* Events */

document.getElementById("input_find").addEventListener("change", (e) => {
	e.preventDefault();
	const array_prod = Object.values(productosJson.data);
	const search = document.querySelector("#input_find").value.toUpperCase();
	const productsfilter = filterProduct(array_prod, search);
	if (productsfilter.length >= 1) {
		crearTarjetasProductosInicio(productsfilter);
	} else {
		crearTarjetasProductosInicio(products);
	}
});
